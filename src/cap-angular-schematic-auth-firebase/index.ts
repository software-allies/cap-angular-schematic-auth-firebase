import {
  apply,
  FileEntry,
  forEach,
  MergeStrategy,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  template,
  Tree,
  url,
  chain,
  // noop,
  SchematicsException
} from '@angular-devkit/schematics';
import { Schema as SchemaOptions } from './schema';
import { getFileContent } from '@schematics/angular/utility/test';
import {
  addPackageJsonDependency,
  getWorkspace,
  NodeDependency,
  NodeDependencyType,
  getProjectFromWorkspace,
  getAppModulePath,
  WorkspaceProject,
  addImportToModule,
  // findPropertyInAstObject,
  // findModule,
  // removePropertyInAstObject,
  // InsertChange,
} from 'schematics-utilities';
import { appendToStartFile } from './cap-utils';

import { join, normalize } from 'path';
import { FileSystemSchematicContext } from '@angular-devkit/schematics/tools';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { getProjectMainFile, getSourceFile } from 'schematics-utilities/dist/cdk';


export default function (options: any): Rule {
  return (host: Tree, context: FileSystemSchematicContext) => {

    const workspace = getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);
    if (!project) {
      throw new SchematicsException(`Project is not defined in this workspace.`);
    }

    // Get the styles.scss file 
    let styles = `src/styles.scss`;
    if (host.read(styles) === null) {
      styles = `src/styles.css`;
    }

    const files: any = {
      styles: styles,
    }

    function installPackageJsonDependencies(): Rule {
      return (host: Tree, context: SchematicContext) => {
        context.addTask(new NodePackageInstallTask());
        context.logger.log('info', `🔍 Installing packages...`);
        return host;
      };
    }
    
    return chain([
      capAngularSchematicAuthFirebase(options),
      addPackageJsonDependencies(),
      installPackageJsonDependencies(),
      addModuleToImports(options),
      appendToStylesFile(files.styles),
      addToEnvironments(options)
    ])(host, context);
  }
}

function addToEnvironments(options: SchemaOptions): Rule {
  return (host: Tree) => {
    // development environment
    addEnvironmentVar(host, '', '/src', 'apiKey', options.credentials ? options.apiKey : '');
    addEnvironmentVar(host, '', '/src', 'authDomain', options.credentials ? options.authDomain : '');
    addEnvironmentVar(host, '', '/src', 'databaseURL', options.credentials ? options.databaseURL: '');
    addEnvironmentVar(host, '', '/src', 'projectId', options.credentials ? options.projectId : '');
    addEnvironmentVar(host, '', '/src', 'storageBucket', options.credentials ? options.storageBucket : '');
    addEnvironmentVar(host, '', '/src', 'messagingSenderId', options.credentials ? options.measurementId : '');
    addEnvironmentVar(host, '', '/src', 'appId', options.credentials ? options.appId : '');
    addEnvironmentVar(host, '', '/src', 'measurementId', options.credentials ? options.measurementId : '');
    // addEnvironmentVar(host, '', options.path || '/src', 'measurementId', options.measurementId);
    if (options.credentials) {
      addEnvironmentVar(host, 'prod', '/src', 'apiKey', options.credentials ? options.apiKey : '');
      addEnvironmentVar(host, 'prod', '/src', 'authDomain', options.credentials ? options.authDomain : '');
      addEnvironmentVar(host, 'prod', '/src', 'databaseURL', options.credentials ? options.databaseURL: '');
      addEnvironmentVar(host, 'prod', '/src', 'projectId', options.credentials ? options.projectId : '');
      addEnvironmentVar(host, 'prod', '/src', 'storageBucket', options.credentials ? options.storageBucket : '');
      addEnvironmentVar(host, 'prod', '/src', 'messagingSenderId', options.credentials ? options.measurementId : '');
      addEnvironmentVar(host, 'prod', '/src', 'appId', options.credentials ? options.appId : '');
      addEnvironmentVar(host, 'prod', '/src', 'measurementId', options.credentials ? options.measurementId : '');
    }
  }
}

function appendToStylesFile(path: string): Rule {
  return (host: Tree) => {
    const content = `
/*
*
* ==========================================
* AUTHENTICATION STYLES
* ==========================================
*
*/

.box {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 3em;
}

.box > div {
  height: max-content !important;
  border-radius: 12px !important;
  font-family: "Segoe UI","Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji" !important;
  padding: 50px !important;
  width: 550px !important;
  margin: 0 !important;
  color: #000;
  background-color:  #e9ecef;
}

.box > div > form > div input {
  border-radius: 12px !important;
  // background-color: #e2e3e5;
  // background-color:  #e9ecef;
  border-color: #000;
}

.box > div > form > div input:focus {
  border-radius: 12px !important;
  outline:none !important;
  outline-width: 0 !important;
  box-shadow: none !important;
  -moz-box-shadow: none !important;
  -webkit-box-shadow: none !important;
  border-color: #000;
  // background-color: #e9ecef;
  border-width: 1.5px;
}

.box > div > form > div small a {
  color: #000;
}

.box > div > form button {
  margin-top: 2em !important;
  border-radius: 12px !important;
  background-color: #000 ;
  border-color: #000;
  color: #fff;
}

.box > div > form button:hover {
  background-color: #343a40;
  border-color: #343a40;
}

.box > div > form button:focus {
  background-color: #343a40 !important;
  border-color: #343a40 !important;
  box-shadow: none !important;
}

.box > div > form button:active {
  background-color: #343a40 !important;
  border-color: #343a40 !important;
  box-shadow: none !important;
  transform: translateY(1.5px);
}

.box > div > div > form > div > div > div >input {
  border-radius: 12px !important;
  border-color: #000;
}

.box > div > div > form > div > div > div >input:focus {
  border-radius: 12px !important;
  outline:none !important;
  outline-width: 0 !important;
  box-shadow: none !important;
  -moz-box-shadow: none !important;
  -webkit-box-shadow: none !important;
  border-color: #000;
  // background-color: #e9ecef;
  border-width: 1.5px;
}

.box > div > div > form > div > div > button {
  margin-top: 2em !important;
  border-radius: 12px !important;
  background-color: #000;
  border-color: #000;
  color: #fff;
}

.box > div > div > form > div > div > button:hover {
  background-color: #343a40;
  border-color: #343a40;
}

.box > div > div > form > div > div > button:focus {
  background-color: #343a40 !important;
  border-color: #343a40 !important;
  box-shadow: none !important;
}

.box > div > div > form > div > div > button:active {
  background-color: #343a40 !important;
  border-color: #343a40 !important;
  box-shadow: none !important;
  transform: translateY(1.5px);
}

.box > div > div > div > div > button {
  margin-top: 2em !important;
  border-radius: 12px !important;
  background-color: #000;
  border-color: #000;
  color: #fff ;
}

.box > div > div > div > div > button:hover {
  background-color: #343a40;
  border-color: #343a40;
}

.box > div > div > div > div > button:focus {
  background-color: #343a40 !important;
  border-color: #343a40 !important;
  box-shadow: none !important;
}

.box > div > div > div > div > button:active {
  background-color: #343a40 !important;
  border-color: #343a40 !important;
  box-shadow: none !important;
  transform: translateY(1.5px);
}

.box > div > div > div > div > div > button {
  // margin-top: 2em !important;
  border-radius: 12px !important;
  background-color: #000;
  border-color: #000;
  color: #fff;
}

.box > div > div > div > div > div > button:hover {
  background-color: #343a40;
  border-color: #343a40;
}

.box > div > div > div > div > div > button:focus {
  background-color: #343a40 !important;
  border-color: #343a40 !important;
  box-shadow: none !important;
}

.box > div > div > div > div > div > button:active {
  background-color: #343a40 !important;
  border-color: #343a40 !important;
  box-shadow: none !important;
  transform: translateY(1.5px);
}
`;
    appendToStartFile(host, path, content);
    return host;
  };
}


export function setupOptions(host: Tree, options: any): Tree {
  const workspace = getWorkspace(host);
  if (!options.project) {
    options.project = Object.keys(workspace.projects)[0];
  }
  const project = workspace.projects[options.project];

  options.path = join(normalize(project.root), 'src/app/modules/cap-authentication');
  return host;
}

export function capAngularSchematicAuthFirebase(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    setupOptions(tree, _options);

    const movePath = normalize(_options.path + '/');
    const templateSource = apply(url('./files'), [
      template({
        ..._options
      }),
      move(movePath),
      forEach((fileEntry: FileEntry) => {
        if (tree.exists(fileEntry.path)) {
          tree.overwrite(fileEntry.path, fileEntry.content);
        }
        return fileEntry;
      }),
    ]);
    const rule = mergeWith(templateSource, MergeStrategy.Overwrite);
    
    return rule(tree, _context);;
  };
}

export function addPackageJsonDependencies(): Rule {
  return (host: Tree, context: SchematicContext) => {
    const dependencies: NodeDependency[] = [
      { type: NodeDependencyType.Default, version: '^1.0.39', name: 'cap-authentication-firebase' },
      // { type: NodeDependencyType.Default, version: '1.0.36', name: 'cap-authentication-firebase' },
      { type: NodeDependencyType.Default, version: '^7.2.3', name: 'firebase' },
      { type: NodeDependencyType.Default, version: '^5.2.1', name: '@angular/fire' },
      { type: NodeDependencyType.Default, version: '^4.3.1', name: 'bootstrap' },
      { type: NodeDependencyType.Default, version: '^9.5.3', name: 'sweetalert2' },
      { type: NodeDependencyType.Default, version: '4.4.2', name: 'zxcvbn' },
      { type: NodeDependencyType.Default, version: '2.0.0', name: 'angular-password-strength-meter' }
    ];
    dependencies.forEach(dependency => {
      addPackageJsonDependency(host, dependency);
      context.logger.log('info', `✅️ Added "${dependency.name}" into ${dependency.type}`);
    });
    return host;
  };
}

/*export function installPackageJsonDependencies(): Rule {
  return (host: Tree, context: SchematicContext) => {
    context.addTask(new NodePackageInstallTask());
    context.logger.log('info', `🔍 Installing packages...`);
    return host;
  };
}*/

function addModuleToImports (options: any): Rule {
  return (host: Tree) => {
    const workspace = getWorkspace(host);
    let project : WorkspaceProject = getProjectFromWorkspace(workspace, options.project);
    const moduleName = 'CapAuthenticationModule';
    const modulePath = getAppModulePath(host, getProjectMainFile(project));
    auxAddModuleRoorToImports(host, modulePath, moduleName, './modules/cap-authentication/cap-authentication.module');
    return host;
  };
}

export function auxAddModuleRoorToImports (host: Tree, modulePath: string, moduleName: string, src: string) {
  const moduleSource = getSourceFile(host, modulePath);
  if (!moduleSource) {
    throw new SchematicsException(`Module not found: ${modulePath}`);
  }

  const changes = addImportToModule(moduleSource as any, modulePath, moduleName, src);
  let recorder = host.beginUpdate(modulePath);
  changes.forEach((change:any) => {
    // if (change instanceof InsertChange) {
      if (change.toAdd) {
        recorder.insertLeft(change.pos, change.toAdd);
      }
    // }
  });
  host.commitUpdate(recorder);
  return host
}

export function addEnvironmentVar(host: Tree, env: string, appPath: string, key: string, value: string): void {
  const environmentFilePath = `${appPath}/environments/environment${(env) ? '.' + env : ''}.ts`;
  const sourceFile = getFileContent(host, environmentFilePath);
  const keyValue = `
  ${key}: '${value}',`;
  host.overwrite(environmentFilePath, sourceFile.replace('export const environment = {', `export const environment = {${keyValue}` ));
}

