import { join } from 'path';

import { SeedConfig } from './seed.config';

/**
 * This class extends the basic seed configuration, allowing for project specific overrides. A few examples can be found
 * below.
 */
export class ProjectConfig extends SeedConfig {

  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');

  FONTS_DEST = `${this.APP_DEST}/fonts`;
  FONTS_SRC = [
    'node_modules/bootstrap/dist/fonts/*'
  ];

  constructor() {
    super();

    this.APP_TITLE = 'GNSS Site Manager';

    /* Enable typeless compiler runs (faster) between typed compiler runs. */
    // this.TYPED_COMPILE_INTERVAL = 5;

    // Add `NPM` third-party libraries to be injected/bundled.
    this.NPM_DEPENDENCIES = [
      ...this.NPM_DEPENDENCIES,
      {src: 'systemjs/dist/system.src.js', inject: 'shims'},
      {src: 'moment/moment.js', inject: 'libs'},
      {src: 'ng2-bootstrap/bundles/ng2-bootstrap.js', inject: 'libs'},
      {src: 'ng2-table/bundles/ng2-table.js', inject: 'libs'},
      {src: 'bootstrap/dist/css/bootstrap.min.css', inject: true}, // inject into css section
      {src: 'jsonix/jsonix.js', inject: 'libs'},
      {src: 'w3c-schemas/lib/XLink_1_0.js', inject: 'libs'},
      {src: 'ogc-schemas/lib/GML_3_2_1.js', inject: 'libs'},
      {src: 'ogc-schemas/lib/ISO19139_GMD_20070417.js', inject: 'libs'},
      {src: 'ogc-schemas/lib/ISO19139_GCO_20070417.js', inject: 'libs'},
      {src: 'ogc-schemas/lib/ISO19139_GSR_20070417.js', inject: 'libs'},
      {src: 'ogc-schemas/lib/ISO19139_GTS_20070417.js', inject: 'libs'},
      {src: 'ogc-schemas/lib/ISO19139_GSS_20070417.js', inject: 'libs'},
      {src: 'ogc-schemas/lib/OM_2_0.js', inject: 'libs'},
      {src: 'ogc-schemas/lib/GEODESYML_0_3.js', inject: 'libs'},

      {src: 'sw-toolbox/sw-toolbox.js', inject: 'libs'},
    ];

    this.SYSTEM_CONFIG_DEV.paths['ng2-bootstrap'] =
      `${this.APP_BASE}node_modules/ng2-bootstrap/ng2-bootstrap`;

    this.SYSTEM_BUILDER_CONFIG.packages['ng2-bootstrap'] = {
      main: 'ng2-bootstrap.js',
      defaultExtension : 'js'
    };

    this.SYSTEM_CONFIG_DEV.paths['ng2-table'] =
      `${this.APP_BASE}node_modules/ng2-table/ng2-table`;

    this.SYSTEM_BUILDER_CONFIG.packages['ng2-table'] = {
      main: 'ng2-table.js',
      defaultExtension : 'js'
    };

    // Add `local` third-party libraries to be injected/bundled.
    this.APP_ASSETS = [
      ...this.APP_ASSETS,
      // {src: `${this.APP_SRC}/your-path-to-lib/libs/jquery-ui.js`, inject: true, vendor: false}
      // {src: `${this.CSS_SRC}/path-to-lib/test-lib.css`, inject: true, vendor: false},
    ];

    /* Add to or override NPM module configurations: */
    // this.mergeObject(this.PLUGIN_CONFIGS['browser-sync'], { ghostMode: false });
  }

}
