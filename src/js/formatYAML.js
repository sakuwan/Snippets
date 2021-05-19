const yamlFilters = [
  [/\n/g, '<br>'],
  [/__(\S[\s\S]*?)__/g, '<em>$1</em>'],
  [/!!(\S[\s\S]*?)!!/g, '<ins>$1</ins>'],
  [/~~(\S[\s\S]*?)~~/g, '<del>$1</del>'],
  [/\*\*(\S[\s\S]*?)\*\*/g, '<strong>$1</strong>'],

  [
    /\[(.+?(?=\]))\]\(((?:\/|https?:\/\/)[\w\d./?=#%+&]+)\)/g,
    '<a href="$2"><ins>$1</ins></a>',
  ],
];

// eslint-disable-next-line import/prefer-default-export
export const formatYAML = (yamlString) => yamlFilters.reduce(
  (result, filter) => result.replace(...filter), yamlString,
);
