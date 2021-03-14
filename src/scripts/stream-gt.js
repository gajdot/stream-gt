import { Settings } from "./settings";
import { moduleName } from "./utils";

/**
 * @description function to render the Holder element for the player objects
 */
async function renderHolder() {
    var template = await getTemplate("modules/" + moduleName + "/templates/player-holder.html");
    $("body").append(template);
}

/**
 * @description function to add a Player element in the Holder
 */
async function renderPlayer() {
    var template = await getTemplate("modules/" + moduleName + "/templates/player.html");
    $("#board").append(template);
}

Hooks.on("init", function () {
    Settings.setup();
});

Hooks.on("ready", function () {
    renderHolder();
    // game.socket.on("module.stream-gt", (data) => {
    //   if (data.getData) {
    //     game.socket.emit("module.stream-gt", { currentScene: canvas.scene, sendData: true });
    //   }
    // });
});