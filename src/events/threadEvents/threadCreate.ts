import { MessageEmbed, ThreadChannel } from "discord.js";

import { BeccaInt } from "../../interfaces/BeccaInt";
import { sendLogEmbed } from "../../modules/guild/sendLogEmbed";
import { beccaErrorHandler } from "../../utils/beccaErrorHandler";

/**
 * When a new thread is created, logs it to the log channel and joins
 * the thread automatically, to ensure Becca is available for all needs.
 *
 * @param {BeccaInt} Becca Becca's Discord instance.
 * @param {ThreadChannel} thread The channel object representing the new thread.
 */
export const threadCreate = async (
  Becca: BeccaInt,
  thread: ThreadChannel
): Promise<void> => {
  try {
    if (thread.joinable) {
      await thread.join();
    }

    const threadEmbed = new MessageEmbed();

    threadEmbed.setTitle("Thread Created!");
    threadEmbed.setDescription(`The new thread <#${thread.id}> was created!`);
    threadEmbed.setColor(Becca.colours.success);
    threadEmbed.setTimestamp();
    threadEmbed.setFooter(`ID: ${thread.id}`);

    await sendLogEmbed(Becca, thread.guild, threadEmbed);
  } catch (err) {
    beccaErrorHandler(Becca, "thread create event", err);
  }
};
