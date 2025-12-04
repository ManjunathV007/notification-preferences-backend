export const CHANNELS = ['email','sms','push','in_app','chat','whatsapp'] as const;
export type Channel = typeof CHANNELS[number];

export function isValidChannel(c: string): c is Channel {
  return CHANNELS.includes(c as Channel);
}
