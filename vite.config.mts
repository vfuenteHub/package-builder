import commonjsResolve from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import react from '@vitejs/plugin-react-swc';
import path from 'node:path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { name, peerDependencies, version } from './package.json';

const MODULES_MAP: Record<string, string> = {
  react: 'React',
  'react-dom': 'ReactDOM',
};

const getGlobals = (modules: string[]) =>
  Object.fromEntries(modules.map(module => [module, MODULES_MAP[module]]));

const moduleNames = Object.keys(peerDependencies);
const outDir = 'dist';

export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';

  console.log(`\nBuild "${name}-${version}" (${mode})\n`);

  return {
    plugins: [
      react(),
      dts({
        tsconfigPath: path.resolve(__dirname, 'tsconfig.json'),
        staticImport: true,
        insertTypesEntry: true,
        outDir: path.resolve(__dirname, outDir, 'types'),
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    build: {
      outDir,
      copyPublicDir: false,
      minify: isProd,
      cssMinify: isProd,
      cssCodeSplit: false,
      lib: {
        entry: path.resolve(__dirname, 'src', 'index.ts'),
        name,
        formats: ['cjs', 'umd'],
        fileName: format =>
          `${format}/${name}.${mode}${isProd ? '.min' : ''}.js`,
      },
      rollupOptions: {
        plugins: [
          commonjsResolve(),
          nodeResolve({
            moduleDirectories: ['node_modules'],
          }),
        ],
        external: ['react/jsx-runtime', ...moduleNames],
        output: {
          globals: {
            'react/jsx-runtime': 'jsxRuntime',
            ...getGlobals(moduleNames),
          },
          exports: 'named',
          assetFileNames(assetFile) {
            if (assetFile.name?.endsWith('.css')) {
              return `${name}.${mode}${isProd ? '.min' : ''}.css`;
            }

            return `${assetFile.name}`;
          },
        },
      },
      sourcemap: !isProd,
      emptyOutDir: false,
    },
  };
});
