import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/3d-mesh-utils.ts',
  output: {
    file: 'bundle/3d-mesh-utils.min.js',
	sourcemap: true,
	format: 'umd',
	name: 'MESH_UTILS',
	plugins: [
		terser(),
	],
  },
  plugins: [
    typescript({
		sourceMap: true,
		inlineSources: true,
		outDir: './bundle',
	}),
  ],
};