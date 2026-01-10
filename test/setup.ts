import '@testing-library/jest-dom';
import React from 'react';
(globalThis as any).React = React; // helps if any JSX falls back to classic runtime
