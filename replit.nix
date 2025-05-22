{ pkgs }: {
	deps = [
		pkgs.nodejs-20_17
		pkgs.nodePackages.typescript-language-server
		pkgs.yarn
	];
}