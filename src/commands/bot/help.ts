import { MessageEmbed } from "discord.js";
import { CommandInt } from "../../interfaces/commands/CommandInt";
import { errorEmbedGenerator } from "../../modules/commands/errorEmbedGenerator";
import { beccaErrorHandler } from "../../utils/beccaErrorHandler";

export const help: CommandInt = {
  name: "help",
  description:
    "Returns a list of available commands. Optionally provides information on a specific command.",
  parameters: ["`command`: name of the command to get help with"],
  category: "bot",
  isMigrated: true,
  run: async (Becca, message) => {
    try {
      const { guild } = message;

      if (!guild) {
        return { success: false, content: "Unknown guild error." };
      }

      const serverCommands = Becca.commands
        .filter((cmd) => cmd.category === "server" && !cmd.isMigrated)
        .map((cmd) => "`" + cmd.name + "`");

      const helpEmbed = new MessageEmbed();
      helpEmbed.setTitle("Available Spells");
      helpEmbed.setDescription(
        "These are the spells I am still migrating to slash commands. For the time being, you can use these with `becca!` like you did this command."
      );
      helpEmbed.setColor(Becca.colours.default);
      helpEmbed.addField("Server Spells", serverCommands.join(", "));
      helpEmbed.setTimestamp();

      return { success: true, content: helpEmbed };
    } catch (err) {
      const errorId = await beccaErrorHandler(
        Becca,
        "help command",
        err,
        message.guild?.name,
        message
      );
      return {
        success: false,
        content: errorEmbedGenerator(Becca, "help", errorId),
      };
    }
  },
};
