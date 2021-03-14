import { StreamGTCharacterSelector } from './selector';
import { moduleName } from './utils.js';

export class Settings {
    static setup() {
        game.settings.register(moduleName, "enableOverlay", {
            name: moduleName + ".settings.enableOverlay.name",
            hint: moduleName + ".settings.enableOverlay.hint",
            scope: "client",
            config: true,
            type: Boolean,
            default: false,
        });

        game.settings.register(moduleName, "overlayOrientation", {
            name: moduleName + ".settings.overlayOrientation.name",
            scope: "client",
            config: true,
            type: String,
            choices: {
                "horizontal": moduleName + ".settings.overlayOrientation.horizontal",
                "vertical": moduleName + ".settings.overlayOrientation.vertical"
            },
            default: "horizontal",
        });

        game.settings.register(moduleName, "checkedList", {
            scope: "client",
            type: Array,
            default: [],
        });
        game.settings.registerMenu(moduleName, "actorSelector", {
            name: moduleName + ".settings.actorSelector.name",
            label: moduleName + ".settings.actorSelector.label",
            type: StreamGTCharacterSelector,
            restricted: false,
        });

        game.settings.register(moduleName, "hpPath", {
            name: moduleName + ".settings.hpPath.name",
            hint: moduleName + ".settings.hpPath.hint",
            scope: "world",
            type: String,
            default: "data.data.attributes.hp.value",
            config: true,
            restricted: true,
        });

        game.settings.register(moduleName, "maxHpPath", {
            name: moduleName + ".settings.maxHpPath.name",
            hint: moduleName + ".settings.maxHpPath.hint",
            scope: "world",
            type: String,
            default: "data.data.attributes.hp.max",
            config: true,
            restricted: true,
        });
    }
}