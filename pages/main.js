import { xmlGetHttpRequest } from "./xml-get-http-request.js"
import {getGistFirstFileText} from "./get-gist-first-file-text.js"

const gistUrl = 'https://gist.github.com/sturmenta/df1c9da1f219c88e996e48f19d57acd3';

const {data, error} = /*await*/ getGistFirstFileText(`${gistUrl}.json`);

console.log(data);


