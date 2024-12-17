const intercept = require('intercept-stdout');

// safely ignore recoil stdout warning messages
function interceptStdout(text) {
  if (text.includes('Duplicate atom key')) {
    return '';
  }
  return text;
}

// Intercept in dev and prod
intercept(interceptStdout);

const nextConfig = {
  output: 'standalone',
  staticPageGenerationTimeout: 1000,
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
