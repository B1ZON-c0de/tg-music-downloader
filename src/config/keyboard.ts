import { Track } from "../types/types";
import { InlineKeyboard } from "grammy";

export const getInlineKeyboardTracks = (tracks: Track[]) => {
  const inlineButtons = tracks.map(({ title, user, id }) => [ InlineKeyboard
    .text(`${ user.username } - ${ title }`, `track_${ id }`) ]
  )

  return InlineKeyboard.from(inlineButtons)
}