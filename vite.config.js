import { redBright } from "colorette"
import { defineConfig } from 'vite'

class ConfigHandler {
    constructor() {
        this.mode = null;

        /**
         * Add as many Map elements as you want configs
         * The key value represents the config flag
         * 
         */
        this.configList = new Map()
            .set('dev', Configs.dev())
            .set('library', Configs.library())
    }

    get(value) {
        const config = this.configList.get(value);
        if (!config) {
            console.log(redBright('The config mode flag does not exist'));
            process.exit();
        }

        return config;
    }
}

class Configs {
    static dev() {
        return {}
    }

    static library() {
        return {
            build: {
                lib: {
                    entry: 'src/main.ts',
                    name: 'MyLib',
                    formats: ['es'],
                    },
                rollupOptions: {
                    output: {
                        preserveModules: true
                    }
                },
                minify: false
            }
        }
    }
}

const arg = process.env.npm_config_mode;
const config = new ConfigHandler();

export default defineConfig(config.get(arg));