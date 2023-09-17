// assets
// declare module '*.svg' {
//   const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
//   export default content;
// }

// declare module "*.svg" {
// 	const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
// 	export default ReactComponent;
// }

declare module "*.svg" {
	export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
	const src: string;
	export default src;
}

// typescript css modules

declare module "*.css" {
	const classes: { [key: string]: string };
	export default classes;
}

declare module "*.scss" {
	const classes: { [key: string]: string };
	export default classes;
}

declare module "*.sass" {
	const classes: { [key: string]: string };
	export default classes;
}

declare module "*.less" {
	const classes: { [key: string]: string };
	export default classes;
}

declare module "*.styl" {
	const classes: { [key: string]: string };
	export default classes;
}
