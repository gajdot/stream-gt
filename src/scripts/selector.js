import { moduleName } from "./utils";

export class StreamGTCharacterSelector extends FormApplication {
    constructor(options = {}) {
        super(options);

        this.actors = this.setupActorList();
        this.getList = this.getList.bind(this);
        this.setList = this.setList.bind(this);
    }

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: moduleName + "-chooser",
            title: game.i18n.localize(moduleName + ".windows.CharacterSelector.title"),
            template: "modules/stream-gt/templates/charchooser.html",
            classes: ["sheet"],
            closeOnSubmit: true,
            resizable: true,
        });
    }

    getData(options) {
        const data = super.getData(options);

        data.actors = this.actors;

        return data;
    }

    /**
     * @param  {JQuery} html
     */
    activateListeners(html) {
        super.activateListeners(html);

        html.find(".cancelButton").on("click", () => this.close());
    }

    setupActorList() {
        /** @type {[{name: String, id: String, checked: Boolean}]} */
        let actors = [];
        /** @type {String[]} */
        const checkedList = this.getList();

        game.actors.forEach(
            /** @param  {Actor} actor */
            (actor) => {
                if (actor.hasPlayerOwner) {
                    actors.push({
                        name: actor.name,
                        id: actor.id,
                        checked: checkedList.includes(actor.id),
                    });
                }
            }
        );

        return actors;
    }

    _updateObject(_e, data) {
        let checkedList = [];
        for (let prop in data) {
            if (data[prop]) {
                checkedList.push(prop);
            }
        }
        this.setList(checkedList);
    }

    // gets setting and sets current value to it
    /** @return {String[]} */
    getList() {
        return game.settings.get(moduleName, "checkedList")?.[0];
    }

    // sets setting to current value
    setList(checkedList) {
        game.settings.set(moduleName, "checkedList", checkedList);
    }
}