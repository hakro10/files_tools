export interface ToolMetadata {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  category: string;
  iconName: string;
  badge?: string;
  keywords: string[];
  howItWorks: string;
  privacyFaq: Array<{ question: string; answer: string }>;
  codeSnippets: Array<{ language: string; title: string; code: string }>;
  features: string[];
}

export const TOOLS: ToolMetadata[] = [
  {
    id: 'json-formatter',
    slug: 'json-formatter',
    name: 'JSON Formatter, Validator & Tree Visualizer',
    shortDescription: 'Format, validate, repair, minify, and interactively explore nested JSON structures in real-time right inside your browser.',
    category: 'Data & Utilities',
    iconName: 'Braces',
    badge: 'Popular',
    keywords: ['json formatter', 'json validator', 'json tree visualizer', 'json minifier', 'client side json'],
    howItWorks: `The DevSuite JSON Formatter, Validator & Tree Visualizer processes raw JavaScript Object Notation (JSON) strings entirely within your local browser runtime.

When you paste or type JSON data into the input workspace, our parser immediately evaluates syntax adherence using high-performance local ECMAScript parsers. If syntax anomalies are detected—such as trailing commas, unescaped characters, missing quotes, or misplaced brackets—the editor pinpointing engine identifies exact character offsets and line numbers.

When validation succeeds, you can seamlessly toggle between formatted code mode (with configurable tab/space indentation), minified compact mode (stripping unneeded whitespace for payload reduction), and an interactive tree visualization mode. The visual tree mode transforms hierarchical JSON into interactive collapsable nodes, complete with primitive data type badges (string, number, boolean, null, array, object) and inline property search filtering.`,
    privacyFaq: [
      {
        question: 'Is my JSON data uploaded to any server or remote backend?',
        answer: 'No. Absolute privacy is guaranteed. 100% of JSON parsing, formatting, validation, and tree rendering occurs exclusively inside your web browser memory. Zero network payloads are dispatched to external servers.'
      },
      {
        question: 'Can I format confidential API responses, credentials, or customer payloads safely?',
        answer: 'Yes. Because data never leaves your client device memory session, DevSuite provides a completely isolated sandbox suitable for processing sensitive API data, database exports, and configuration files.'
      },
      {
        question: 'How large of a JSON payload can this tool handle?',
        answer: 'Our optimized virtualized tree renderer and Web API worker structure can effortlessly process JSON files up to several megabytes in under 50 milliseconds.'
      }
    ],
    codeSnippets: [
      {
        language: 'JavaScript / Node.js',
        title: 'Native JSON Formatting & Minification',
        code: `// Format JSON with 2-space indentation
const rawJson = '{"name":"DevSuite","type":"utility","active":true}';
const parsed = JSON.parse(rawJson);
const formatted = JSON.stringify(parsed, null, 2);

console.log(formatted);

// Minify JSON
const minified = JSON.stringify(parsed);
console.log(minified);`
      },
      {
        language: 'Python',
        title: 'Format JSON via Python standard library',
        code: `import json

raw_json = '{"name": "DevSuite", "privacy": "client-side", "tools": 6}'
data = json.loads(raw_json)

# Pretty print JSON with indentation
pretty_json = json.dumps(data, indent=2)
print(pretty_json)

# Minify JSON
compact_json = json.dumps(data, separators=(',', ':'))
print(compact_json)`
      },
      {
        language: 'cURL / CLI',
        title: 'Format JSON output in terminal via jq',
        code: `# Pretty print JSON response from API using jq
curl -s https://api.github.com/zen | jq '.'

# Process raw JSON string in CLI
echo '{"status":"ok","code":200}' | jq '.status'`
      }
    ],
    features: [
      'Real-time syntax validation with line number error hints',
      'Interactive collapsable JSON tree visualizer',
      'One-click format (2 spaces, 4 spaces, Tab) & minification',
      'Instant copy to clipboard & JSON file export',
      '100% client-side offline-ready execution'
    ]
  },
  {
    id: 'jwt-decoder',
    slug: 'jwt-decoder',
    name: 'JWT (JSON Web Token) Decoder & Signature Verifier',
    shortDescription: 'Decode headers, payload claims, and verify HMAC SHA-256 signatures client-side using browser Web Crypto API.',
    category: 'Security & Auth',
    iconName: 'ShieldCheck',
    badge: 'Web Crypto API',
    keywords: ['jwt decoder', 'jwt signature verifier', 'web crypto jwt', 'json web token', 'hs256 verification'],
    howItWorks: `JSON Web Tokens (JWT) consist of three Base64URL-encoded parts separated by dots: Header, Payload, and Signature (header.payload.signature).

The DevSuite JWT Decoder immediately parses raw JWT strings into distinct Base64URL components. The Header section reveals cryptographic algorithms (e.g., HS256, RS256) and token type details. The Payload section extracts all claims, including standard claims such as Expiration Time (exp), Issued At (iat), Subject (sub), Issuer (iss), and Audience (aud). The tool calculates live expiration status, showing exact countdowns or expired timestamps relative to your current local system time.

Furthermore, leveraging the modern browser-native Web Crypto API (crypto.subtle), DevSuite allows you to enter a secret key to perform cryptographic HMAC SHA-256 verification locally. It computes the cryptographic hash over the token's header and payload and compares it against the decoded signature, providing instant verification without exposing secret keys to any backend service.`,
    privacyFaq: [
      {
        question: 'Are my JWT tokens or secret keys transmitted to remote servers?',
        answer: 'Never. All decoding, claim parsing, and cryptographic HMAC computations are executed locally via the Web Crypto API (crypto.subtle). Your sensitive auth tokens and secret keys remain strictly within browser memory.'
      },
      {
        question: 'Which signature algorithms can be verified locally?',
        answer: 'Currently, HMAC signature algorithms (HS256, HS384, HS512) can be verified locally using your secret key. Header & payload decoding works for all standard JWT types including RS256, ES256, and EdDSA.'
      },
      {
        question: 'Why is client-side JWT decoding safer than traditional online decoders?',
        answer: 'Traditional online decoders often send tokens over network requests to backend servers, creating severe security vulnerabilities where session tokens or secrets could be intercepted or logged. DevSuite is 100% client-side, eliminating remote logging risks completely.'
      }
    ],
    codeSnippets: [
      {
        language: 'JavaScript (Web Crypto API)',
        title: 'Native Browser Web Crypto Signature Verification',
        code: `// Verify HMAC SHA-256 signature using browser subtle crypto
async function verifyJwtHs256(token, secret) {
  const [headerB64, payloadB64, signatureB64] = token.split('.');
  const encoder = new TextEncoder();
  
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify']
  );

  const data = encoder.encode(\`\${headerB64}.\${payloadB64}\`);
  const signatureBytes = Uint8Array.from(
    atob(signatureB64.replace(/-/g, '+').replace(/_/g, '/')),
    c => c.charCodeAt(0)
  );

  const isValid = await crypto.subtle.verify('HMAC', key, signatureBytes, data);
  return isValid;
}`
      },
      {
        language: 'Python',
        title: 'Decode & Verify JWT using PyJWT',
        code: `import jwt

token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
secret = "your-256-bit-secret"

# Decode payload with signature verification
try:
    payload = jwt.decode(token, secret, algorithms=["HS256"])
    print("Valid token payload:", payload)
except jwt.ExpiredSignatureError:
    print("Token signature has expired")
except jwt.InvalidTokenError:
    print("Invalid token signature")`
      },
      {
        language: 'Node.js',
        title: 'Decode JWT payload without verifying signature',
        code: `const jwt = require('jsonwebtoken');

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";

// Decode without secret verification (Client inspection)
const decoded = jwt.decode(token, { complete: true });
console.log("Header:", decoded.header);
console.log("Payload:", decoded.payload);`
      }
    ],
    features: [
      'Instant Header, Payload & Signature decomposition',
      'Web Crypto API HMAC SHA-256 signature verification',
      'Live token expiration countdown timer (exp claim detector)',
      'Formatted color-coded JSON views for header and payload claims',
      'Zero server calls — complete secret key isolation'
    ]
  },
  {
    id: 'sql-formatter',
    slug: 'sql-formatter',
    name: 'SQL Query Formatter & Minifier',
    shortDescription: 'Beautify complex SQL statements across multiple dialects, adjust keyword casing, or minify queries for embedded scripts.',
    category: 'Database',
    iconName: 'Database',
    badge: 'Multi-Dialect',
    keywords: ['sql formatter', 'sql beautifier', 'sql minifier', 'sql parser', 'format postgresql mysql'],
    howItWorks: `The DevSuite SQL Query Formatter & Minifier parses complex SQL expressions into standardized, human-readable database queries with precise indentation and structural hierarchy.

Database queries generated by ORMs or extracted from application logs often appear as monolithic, single-line strings that are exceptionally difficult to read and debug. Our formatter tokenizes SQL syntax into SELECT clauses, JOIN definitions, WHERE conditionals, GROUP BY aggregations, and subqueries.

You can customize keyword casing (UPPERCASE, lowercase, or preserve original casing), select specific database dialects (Standard SQL, PostgreSQL, MySQL, MariaDB, SQLite, Transact-SQL), and adjust indent spacing. Conversely, the minifier mode strips single-line (-- ) and block (/* */) comments, condenses redundant whitespace, and outputs compact single-line queries ideal for inline script execution.`,
    privacyFaq: [
      {
        question: 'Are my database queries or schema names uploaded to any server?',
        answer: 'No. SQL formatting and minification runs 100% locally inside your web browser. Proprietary database structure, table names, and query parameter values remain strictly private.'
      },
      {
        question: 'Which SQL dialects are supported?',
        answer: 'DevSuite supports standard ANSI SQL, PostgreSQL, MySQL, MariaDB, SQLite, and Microsoft Transact-SQL (T-SQL).'
      },
      {
        question: 'Does minification break parameterized queries?',
        answer: 'No. The minification engine recognizes strings, subqueries, and standard parameter placeholders ($1, ?, :param) and preserves their integrity while eliminating unnecessary formatting whitespace.'
      }
    ],
    codeSnippets: [
      {
        language: 'JavaScript / TypeScript',
        title: 'Programmatic SQL Formatting via sql-formatter',
        code: `import { format } from 'sql-formatter';

const unformattedSql = 'select id, name, email from users where active = 1 order by created_at desc';

const formattedSql = format(unformattedSql, {
  language: 'postgresql',
  keywordCase: 'upper'
});

console.log(formattedSql);`
      },
      {
        language: 'Python',
        title: 'Format SQL queries using sqlparse',
        code: `import sqlparse

raw_sql = "select a.id, b.title from posts a inner join categories b on a.cat_id = b.id where a.status = 'published';"

# Format SQL with reindentation and keyword capitalization
formatted = sqlparse.format(
    raw_sql,
    reindent=True,
    keyword_case='upper'
)

print(formatted)`
      },
      {
        language: 'cURL / CLI',
        title: 'Minify SQL file via command line sed/tr',
        code: `# Quick single-line SQL minification via bash
cat query.sql | tr '\\n' ' ' | sed -E 's/ +/ /g'`
      }
    ],
    features: [
      'Supports PostgreSQL, MySQL, MariaDB, SQLite, and T-SQL dialects',
      'Configurable keyword casing (UPPERCASE, lowercase, preserve)',
      'Custom indent width options',
      'High-performance query minifier for embedded application strings',
      '100% client-side privacy with sub-50ms execution'
    ]
  },
  {
    id: 'regex-tester',
    slug: 'regex-tester',
    name: 'Regex (Regular Expression) Tester with Token Highlighting',
    shortDescription: 'Test regular expressions in real-time with visual match highlighting, capture group extraction, and instant cheat sheet.',
    category: 'Text & Parsing',
    iconName: 'Regex',
    badge: 'Live Highlighting',
    keywords: ['regex tester', 'regular expression evaluator', 'regex match highlighter', 'regex capture groups', 'js regex'],
    howItWorks: `The DevSuite Regex Tester offers an interactive, real-time workspace for crafting, testing, and debugging regular expressions against sample text inputs.

As you construct your regular expression pattern, the client-side evaluation engine continuously compiles the RegExp object with your chosen execution flags (Global g, Ignore Case i, Multiline m, Dot All s). Matches within the sample text are dynamically highlighted using distinct color tokens to clearly differentiate adjoining match boundaries.

Detailed match metrics provide full visibility into execution results: total match count, character index positions, and breakdown of named or numbered capture groups. Additionally, an integrated cheat sheet provides quick reference access to common regex patterns such as email validation, URL extraction, IP addresses, dates, and lookaround assertions.`,
    privacyFaq: [
      {
        question: 'Does this regex tool send my text or regular expressions over the network?',
        answer: 'No. All regular expression compilation and matching takes place locally in your browser memory. Your test strings, data logs, and custom regex patterns are never saved or sent anywhere.'
      },
      {
        question: 'What JavaScript Regular Expression engine is used?',
        answer: 'DevSuite leverages the browser native ECMAScript V8 / SpiderMonkey RegExp engine, guaranteeing 100% compatibility with standard modern JavaScript environments.'
      },
      {
        question: 'How are catastrophic backtracking (ReDoS) scenarios prevented?',
        answer: 'Our evaluator wraps regex execution in a high-speed execution budget guard, preventing browser tab freezes if a non-deterministic regex pattern is entered.'
      }
    ],
    codeSnippets: [
      {
        language: 'JavaScript ES6',
        title: 'Extract Regex Matches and Capture Groups in JS',
        code: `const pattern = /(\\d{4})-(\\d{2})-(\\d{2})/g;
const text = "Release dates: 2026-07-30 and 2026-12-25";

// Match all with capture groups using matchAll
const matches = [...text.matchAll(pattern)];

matches.forEach((match, index) => {
  console.log(\`Match \${index + 1}: \${match[0]}\`);
  console.log(\`Year: \${match[1]}, Month: \${match[2]}, Day: \${match[3]}\`);
});`
      },
      {
        language: 'Python',
        title: 'Regex pattern matching with Python re module',
        code: `import re

pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
email = "developer@devsuite.io"

if re.match(pattern, email):
    print("Valid email format")
else:
    print("Invalid email format")`
      },
      {
        language: 'cURL / CLI',
        title: 'Regex search using ripgrep or grep in terminal',
        code: `# Search files with PCRE2 regex using ripgrep
rg -P '(?<=@)[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}' logfile.txt

# Grep with extended regex
grep -E '^[0-9]{3}-[0-9]{3}-[0-9]{4}$' contacts.txt`
      }
    ],
    features: [
      'Real-time match highlighting overlay directly on sample text',
      'Toggleable regex flags (g, i, m, s, u, y)',
      'Capture groups breakdown table with index locations',
      'Built-in Regex Cheat Sheet with one-click pattern insertion',
      'Instant match count and execution status indicators'
    ]
  },
  {
    id: 'base64-url-encoder',
    slug: 'base64-url-encoder',
    name: 'Base64 & URL Encoder/Decoder',
    shortDescription: 'Encode and decode text strings or binary files to Base64, URL component formats, and URL-safe Base64 variants.',
    category: 'Encoding & Web',
    iconName: 'Binary',
    badge: 'Binary & Text',
    keywords: ['base64 encoder', 'base64 decoder', 'url encoder', 'url decoder', 'url safe base64', 'file to base64'],
    howItWorks: `The DevSuite Base64 & URL Encoder/Decoder provides a comprehensive suite for transforming raw strings and binary file assets into web-safe encoded formats and vice-versa.

Base64 encoding converts binary or text data into 64 printable ASCII characters (A-Z, a-z, 0-9, +, /) with '=' padding, ensuring safe transmission across protocols designed for plain text. The tool also supports URL-Safe Base64 variants where '+' is replaced with '-' and '/' is replaced with '_'.

URL Encoding (percent-encoding) translates special characters, spaces, and non-ASCII symbols into safe '%' hex sequences (e.g. spaces become '%20' or '+') suitable for inclusion in query parameters and HTTP headers. Furthermore, DevSuite features a file-to-Base64 converter that allows drag-and-drop file encoding with inline media preview for images and documents.`,
    privacyFaq: [
      {
        question: 'Are my uploaded files or text strings sent to any external server?',
        answer: 'No. File reading is performed using the local browser FileReader API. Files uploaded to the Base64 converter are processed 100% in local memory and are never uploaded to any cloud server.'
      },
      {
        question: 'What is the difference between standard Base64 and URL-Safe Base64?',
        answer: 'Standard Base64 contains + and / characters which have reserved meanings in HTTP URLs. URL-Safe Base64 replaces + with - and / with _ so the encoded string can be safely embedded in URL query parameters without requiring double encoding.'
      },
      {
        question: 'Can I decode base64 data URLs directly?',
        answer: 'Yes. DevSuite automatically detects Data URLs (e.g., data:image/png;base64,...) and strips metadata headers to isolate the raw decoded string or render a preview.'
      }
    ],
    codeSnippets: [
      {
        language: 'JavaScript',
        title: 'Native Browser Base64 & URL Encoding',
        code: `// Text string to Base64 & URL Safe Base64
const text = "DevSuite Premium Tools 🚀";
const base64 = btoa(unescape(encodeURIComponent(text)));
console.log("Base64:", base64);

// URL component encoding
const urlParam = encodeURIComponent("user@example.com & query=123");
console.log("URL Encoded:", urlParam);`
      },
      {
        language: 'Python',
        title: 'Base64 & URL encoding in Python',
        code: `import base64
import urllib.parse

text = "DevSuite high-performance tools"

# Base64 Encode & Decode
b64_encoded = base64.b64encode(text.encode('utf-8')).decode('utf-8')
b64_decoded = base64.b64decode(b64_encoded).decode('utf-8')

# URL Encode
url_encoded = urllib.parse.quote(text)
print(f"B64: {b64_encoded} | URL: {url_encoded}")`
      },
      {
        language: 'cURL / CLI',
        title: 'Base64 encoding via command line',
        code: `# Encode string to Base64 in terminal
echo -n "DevSuite" | base64

# Decode Base64 string in terminal
echo -n "RGV2U3VpdGU=" | base64 --decode`
      }
    ],
    features: [
      'Base64 Text & Binary File Encoder / Decoder',
      'URL Component Percent-Encoding & Decoding',
      'URL-Safe Base64 option (+ / to - _)',
      'Drag-and-drop file to Data-URL converter with media preview',
      'Real-time auto-detection of encoded payload format'
    ]
  },
  {
    id: 'flexbox-grid-playground',
    slug: 'flexbox-grid-playground',
    name: 'CSS Flexbox & Grid Visual Playground',
    shortDescription: 'Interactively experiment with CSS Flexbox & Grid layouts, inspect element positioning, and export pure CSS and Tailwind CSS classes.',
    category: 'CSS & Design',
    iconName: 'Layout',
    badge: 'Visual Generator',
    keywords: ['css flexbox playground', 'css grid visualizer', 'tailwind grid generator', 'flex layout builder', 'css generator'],
    howItWorks: `The DevSuite CSS Flexbox & Grid Visual Playground provides an intuitive visual interface for designing, prototyping, and mastering complex modern CSS layouts.

Switch effortlessly between CSS Flexbox and CSS Grid container modes. Tweak parent container controls in real-time, including flex-direction, justify-content, align-items, flex-wrap, gap, grid-template-columns, and grid-template-rows. Dynamic visual handles allow you to add, remove, or reorder child items dynamically.

Each individual child item can be customized independently to simulate real-world layout scenarios—adjusting flex-grow, flex-shrink, align-self, grid-column span, and grid-row span. As you modify visual parameters, DevSuite immediately generates clean, semantic CSS code as well as equivalent utility classes for Tailwind CSS with one-click copy functionality.`,
    privacyFaq: [
      {
        question: 'Are my custom layout configurations saved on a remote server?',
        answer: 'No. All visual layout rendering and code generation occurs locally inside your browser DOM. Layout settings are maintained in local state and are completely private.'
      },
      {
        question: 'Does this playground output Tailwind CSS v3 and v4 compatible utility classes?',
        answer: 'Yes! In addition to standard CSS rules, the playground generates modern Tailwind CSS utility classes (e.g. flex flex-row items-center justify-between gap-4 grid grid-cols-3) ready to paste into your projects.'
      },
      {
        question: 'Can I add custom dimensions to individual child elements?',
        answer: 'Yes. You can toggle custom item counts, adjust individual item flex properties or grid span columns/rows, and inspect exact computed pixel bounds visually.'
      }
    ],
    codeSnippets: [
      {
        language: 'Pure CSS',
        title: 'Modern Responsive CSS Grid Container',
        code: `.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  align-items: center;
}

.item {
  background: #1e293b;
  border-radius: 0.5rem;
  padding: 1rem;
}`
      },
      {
        language: 'Tailwind CSS',
        title: 'Flexbox Layout with Tailwind Utilities',
        code: `<!-- Responsive Flexbox Card Container -->
<div class="flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-slate-900 rounded-xl border border-slate-800">
  <div class="flex-1 shrink-0">
    <h3 class="text-xl font-bold text-white">Card Header</h3>
  </div>
  <button class="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold rounded-lg transition">
    Action Button
  </button>
</div>`
      },
      {
        language: 'HTML & Inline Style',
        title: 'Flex Centering Snippet',
        code: `<div style="display: flex; justify-content: center; align-items: center; min-height: 100vh;">
  <div>Centered Content Block</div>
</div>`
      }
    ],
    features: [
      'Interactive visual toggle between CSS Flexbox and CSS Grid layout modes',
      'Real-time parent container control sliders and select dropdowns',
      'Individual child item overrides (flex-grow, align-self, grid span)',
      'Dual code generation: Pure CSS and Tailwind CSS utility classes',
      'One-click instant copy and visual preview canvas'
    ]
  }
];
