// Quick test of the anagram algorithm
const { findAnagrams, calculateScore } = require('./lib/anagramSolver.ts');
const { getDictionary } = require('./lib/dictionary.ts');

// Test the algorithm
console.log('Testing anagram solver...');

const dictionary = getDictionary('common');
console.log(`Dictionary loaded with ${dictionary.size} words`);

// Test with "GAMES"
const testInput = "GAMES";
console.log(`\nTesting with input: "${testInput}"`);

const results = findAnagrams(testInput.toLowerCase(), dictionary);
console.log(`Found ${results.length} anagrams:`);

results.slice(0, 10).forEach(word => {
  console.log(`- ${word.toUpperCase()} (${calculateScore(word)} points)`);
});

if (results.length > 10) {
  console.log(`... and ${results.length - 10} more`);
}