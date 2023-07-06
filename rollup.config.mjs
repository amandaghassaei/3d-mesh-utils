import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import dts from "rollup-plugin-dts";
import del from "rollup-plugin-delete";

export default [
	{
		input: 'src/index.ts',
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
	},
	{
		input: "./bundle/index.d.ts",
		output: [{ file: "bundle/3d-mesh-utils.d.ts", format: "es" }],
		plugins: [
			dts(),
			del({ hook: "buildEnd", targets: ["./bundle/*.d.ts"] }),
		],
	},
];