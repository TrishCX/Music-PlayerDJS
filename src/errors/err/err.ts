import {
  checkVoiceError as checkErr,
  type CommandInteraction,
} from "../voice/checkVoiceErrors";

namespace Error {
  export function checkVoiceError(
    interaction: CommandInteraction
  ): ReturnType<typeof checkErr> {
    return checkErr(interaction);
  }
}

export { Error };
