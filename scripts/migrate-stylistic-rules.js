/**
 * Script de migration automatique des règles stylistiques ESLint vers @stylistic/eslint-plugin
 * Adapté à Angular + TypeScript-ESLint + ESLint v9
 *
 * Utilisation :
 *   node scripts/migrate-stylistic-rules.js eslint.config.js
 */

const fs = require('fs');
const path = require('path');

const file = process.argv[2] || 'eslint.config.js';
const fullPath = path.resolve(process.cwd(), file);

if (!fs.existsSync(fullPath)) {
  console.error(`❌ Fichier non trouvé : ${fullPath}`);
  process.exit(1);
}

let content = fs.readFileSync(fullPath, 'utf8');

const stylisticRules = [
  'arrow-spacing',
  'block-spacing',
  'brace-style',
  'comma-dangle',
  'comma-spacing',
  'computed-property-spacing',
  'eol-last',
  'func-call-spacing',
  'indent',
  'key-spacing',
  'keyword-spacing',
  'linebreak-style',
  'max-len',
  'no-multiple-empty-lines',
  'object-curly-spacing',
  'quote-props',
  'quotes',
  'semi',
  'semi-spacing',
  'space-before-blocks',
  'space-before-function-paren',
  'space-in-parens',
  'space-infix-ops',
  'spaced-comment',
  'switch-colon-spacing',
  'template-curly-spacing',
];

// --- ajout de l'import ESM si manquant ---
if (!content.includes('@stylistic/eslint-plugin')) {
  const importLine =
    `// ✅ Fix compatibilité ESM/CommonJS\n` +
    `// Certains plugins exportent un champ \`.default\` — on le gère ici proprement\n` +
    `// @ts-ignore\n` +
    `import stylisticModule from '@stylistic/eslint-plugin';\n` +
    `const stylistic = stylisticModule.default || stylisticModule; // ajouté automatiquement\n\n`;

  // Si le fichier commence déjà par "import", on l’insère après la première ligne d’import
  if (/^import .+? from .+?;$/m.test(content)) {
    content = content.replace(/^import .+? from .+?;$/m, (match) => match + '\n' + importLine);
  } else {
    content = importLine + content;
  }
}

// --- ajout du plugin dans la config ---
if (!content.includes("'@stylistic': stylistic")) {
  const pluginsRegex = /plugins:\s*{([^}]*)}/;
  if (pluginsRegex.test(content)) {
    content = content.replace(
      pluginsRegex,
      (match, inner) => `plugins: { ${inner.trim()}\n      '@stylistic': stylistic, }`,
    );
  } else {
    // Si pas de bloc plugins (rare), on en crée un avant "extends"
    content = content.replace(/extends:/, `plugins: { '@stylistic': stylistic },\n    extends:`);
  }
}

// --- remplacement des anciennes règles stylistiques ---
let replaced = 0;
for (const rule of stylisticRules) {
  const regex = new RegExp(`(['"])${rule}\\1\\s*:`, 'g');
  if (regex.test(content)) {
    content = content.replace(regex, `'@stylistic/${rule}':`);
    replaced++;
  }
}

fs.writeFileSync(fullPath, content, 'utf8');

console.log(`✅ Migration terminée ! ${replaced} règle(s) renommée(s) vers @stylistic/*`);
console.log('➡️  Vérifie ton eslint.config.js, puis lance : npx eslint . --fix');
