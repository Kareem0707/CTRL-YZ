const fs = require('fs');
const path = require('path');

const walk = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        results.push(file);
      }
    }
  });
  return results;
};

const files = walk(path.join(__dirname, 'src'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace "import React from 'react';"
  content = content.replace(/import React from 'react';\n/g, '');
  
  // Replace "import React, { ... } from 'react';"
  content = content.replace(/import React, {([^}]+)} from 'react';/g, "import {$1} from 'react';");
  
  // Replace "React.useRef" with "useRef"
  if (content.includes('React.useRef')) {
    content = content.replace(/React\.useRef/g, 'useRef');
    // Ensure useRef is imported
    if (content.includes("import {") && content.includes("} from 'react'") && !content.includes("useRef")) {
      content = content.replace(/import {([^}]+)} from 'react';/, "import { $1, useRef } from 'react';");
    } else if (!content.includes("import {") || !content.includes("from 'react'")) {
       content = "import { useRef } from 'react';\n" + content;
    }
  }

  // Replace "React.FC" with "FC" or just leave React.FC but we removed React.
  // LanguageContext.tsx uses React.FC and React.ReactNode.
  if (content.includes('React.FC') || content.includes('React.ReactNode')) {
    content = content.replace(/React\.FC/g, 'FC');
    content = content.replace(/React\.ReactNode/g, 'ReactNode');
    if (content.includes("import {") && content.includes("} from 'react'")) {
      if (!content.includes("FC")) content = content.replace(/import {([^}]+)} from 'react';/, "import { $1, FC, ReactNode } from 'react';");
    } else {
      content = "import { FC, ReactNode } from 'react';\n" + content;
    }
  }

  fs.writeFileSync(file, content, 'utf8');
});

console.log('Fixed React imports');
