import { PanelConfig } from './panel-config';
import { MetricsPanelCtrl, loadPluginCss } from 'grafana/app/plugins/sdk';

import * as _ from 'lodash';

const DEFAULTS = {

};

class Ctrl extends MetricsPanelCtrl {
    static templateUrl = 'partials/template.html';

    private _panelConfig: PanelConfig;
    private _element: any;

    private _seriesList: any;

    constructor($scope: any, $injector: any, public templateSrv: any) {
        super($scope, $injector);

        _.defaults(this.panel, DEFAULTS);

        this._panelConfig = new PanelConfig(this.panel);
        this._initStyles();
        console.info('DSDEMOPANEL Constructor Executed!');
    }

    link(scope, element) {
        this._element = element;
    }

    _initStyles() {
        // small hack to load base styles
        const cssPath = this._panelConfig.pluginDirName.replace('public/', '');
        loadPluginCss({
            light: cssPath + 'css/panel.base.css',
            dark: cssPath + 'css/panel.base.css'
        });
        loadPluginCss({
            light: cssPath + 'css/panel.light.css',
            dark: cssPath + 'css/panel.dark.css'
        });
    }

    _onRender() {
        console.info('_onRender Executed!');
    }

    _onDataReceived(seriesList: any) {
        console.info('_onDataReceived Executed!');
        console.log('DATA RECEIVED:', seriesList);
        this._seriesList = seriesList;
    }

    _dataError(err) {
        this.$scope.data = [];
        this.$scope.dataError = err;
    }
}

export { Ctrl as PanelCtrl }