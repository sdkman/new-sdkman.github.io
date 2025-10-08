import {
  FaBluesky,
  FaDiscord,
  FaGithub,
  FaMastodon,
  FaStackOverflow,
} from 'react-icons/fa6';

const socialLinks = [
  {
    icon: FaGithub,
    name: 'GitHub',
    url: 'https://github.com/sdkman',
  },
  {
    icon: FaDiscord,
    name: 'Discord',
    url: 'https://discord.gg/y9mVJYVyu4',
  },
  {
    icon: FaBluesky,
    name: 'Bluesky',
    url: 'https://bsky.app/profile/sdkman.io',
  },
  {
    icon: FaMastodon,
    name: 'Mastodon',
    url: 'https://mastodon.social/@sdkman@fosstodon.org',
  },
  {
    icon: FaStackOverflow,
    name: 'Stack Overflow',
    url: 'http://stackoverflow.com/questions/tagged/sdkman',
  },
];

export default socialLinks;
