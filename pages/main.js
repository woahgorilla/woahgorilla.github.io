var HTMLPreview = {

	content: '',
	interval: null,

	previewform: document.getElementById('previewform'),

	file: function () {
		return location.search.substring(1); //Get everything after the ?
	},

	getGistList: function (yourUrl) {
		let Httpreq = new XMLHttpRequest(); // a new request
		Httpreq.open("GET", yourUrl, false);
		Httpreq.send(null);
		return JSON.parse(Httpreq.responseText);
	},
	getUrlJson: function (json) {
		if (json.raw_url) {
			let arrayUrl = json.raw_url.split("/");
			let fileName = arrayUrl.pop();
			arrayUrl.pop();
			arrayUrl.push(fileName);
			return location.href.split('?')[0] + '?' + arrayUrl.join("/");
		} else if (json.download_url) {
			return location.href.split('?')[0] + '?' + json.download_url;
		}
		else {
			return location.href;
		}
	},
	findFile: function (files) {
		let filesKeys = Object.keys(files);
		let firstHtml = false;
		for (i = 0; i < filesKeys.length; ++i) {
			let name = files[filesKeys[i]].filename ? files[filesKeys[i]].filename : files[filesKeys[i]].name;
			if (name.indexOf('index.html') > 0) {
				location.href = HTMLPreview.getUrlJson(files[filesKeys[i]]);
				return false;
			} else if (name.indexOf('.html') > 0 && !firstHtml) {
				firstHtml = HTMLPreview.getUrlJson(files[filesKeys[i]]);
			}
		}
		if (firstHtml) {
			location.href = firstHtml;
			return false;
		}
		location.href = HTMLPreview.file() + '?no-render=true';
		HTMLPreview.loading('RAW file');
		return false;
	},
	getGistHtmlFile() {
		let jsonGist;
		if (HTMLPreview.file().indexOf('//gist.github.com/') > 0) {
			jsonGist = HTMLPreview.getGistList('https://api.github.com/gists/' + HTMLPreview.file().split('/').slice(-1)[0]).files;
			HTMLPreview.findFile(jsonGist);
		} else if (HTMLPreview.file().indexOf('//github.com/') > 0) {
			var ref = '';
			var link = '';
 			if(HTMLPreview.file().indexOf("/tree/") !== -1) {
				ref = '?ref=' + HTMLPreview.file().split('/tree/')[1];
				link = HTMLPreview.file().split('/').slice(-4).slice(0,2).join('/');
			} else if(HTMLPreview.file().indexOf("/blob/") !== -1) {
				ref = '?ref=' + HTMLPreview.file().split('/blob/')[1];
				link = HTMLPreview.file().split('/').slice(-4).slice(0,2).join('/');
			} else {
				link = HTMLPreview.file().split('/').slice(-2).join('/');
			}
			console.log('link:',link);
			jsonGist = HTMLPreview.getGistList('https://api.github.com/repos/' + link + '/contents/' + ref);
			HTMLPreview.findFile(jsonGist);
		} else {
			console.log('Can\'t render this link, than\'s not an html file or git / gist repos');
		}
	},
	raw: function () {
		return HTMLPreview.file().replace(/\/\/github\.com/, '//raw.githubusercontent.com').replace(/\/blob\//, '/'); //Get URL of the raw file

	},

	replaceAssets: function () {
		let frame, a, link, script, i, href, src;
		frame = document.querySelectorAll('iframe[src],frame[src]');
		for (i = 0; i < frame.length; ++i) {
			src = frame[i].src; //Get absolute URL
			if (src.indexOf('//gist.githubusercontent.com') > 0 || src.indexOf('//raw.githubusercontent.com') > 0 || src.indexOf('//bitbucket.org') > 0) { //Check if it's from raw.github.com or bitbucket.org
				frame[i].src = location.href.split('?')[0] + '?' + src; //Then rewrite URL so it can be loaded using YQL
			}
		}
		a = document.querySelectorAll('a[href]');
		for (i = 0; i < a.length; ++i) {
			href = a[i].href; //Get absolute URL
			if (href.indexOf('#') > 0) { //Check if it's an anchor
				a[i].href = location.href.split('?')[0] + location.search + '#' + a[i].hash.substring(1); //Then rewrite URL with support for empty anchor
			}
			else if ((href.indexOf('//gist.githubusercontent.com') > 0 || href.indexOf('//raw.githubusercontent.com') > 0 || href.indexOf('//bitbucket.org') > 0) && (href.indexOf('.html') > 0 || href.indexOf('.htm') > 0)) { //Check if it's from raw.github.com or bitbucket.org and to HTML files
				a[i].href = location.href.split('?')[0] + '?' + href; //Then rewrite URL so it can be loaded using YQL
			}
		}
		if (document.querySelectorAll('frameset').length)
			return; //Don't replace CSS/JS if it's a frameset, because it will be erased by document.write()
		link = document.querySelectorAll('link[rel=stylesheet]');
		for (i = 0; i < link.length; ++i) {
			href = link[i].href; //Get absolute URL
			if (href.indexOf('//gist.githubusercontent.com') > 0 || href.indexOf('//raw.githubusercontent.com') > 0 || href.indexOf('//bitbucket.org') > 0 || href.indexOf('//') === -1) { //Check if it's from raw.github.com or bitbucket.org
				HTMLPreview.send(href, 'loadCSS'); //Then load it using YQL
			}
			else if (href.indexOf('//') === -1) {
				HTMLPreview.send('https://raw.githubusercontent.com/' + href, 'loadCSS');
			}
		}
		script = document.querySelectorAll('script[type="text/htmlpreview"]');
		for (i = 0; i < script.length; ++i) {
			src = script[i].src; //Get absolute URL
			if (src.indexOf('//gist.githubusercontent.com') > 0 || src.indexOf('//raw.githubusercontent.com') > 0 || src.indexOf('//bitbucket.org') > 0) { //Check if it's from raw.github.com or bitbucket.org
				HTMLPreview.send(src, 'loadJS'); //Then load it using YQL
			}
			else { //Append all inline scripts
				script[i].removeAttribute('type');
				document.write(script[i].outerHTML);
			}
		}
	},

	loadHTML: function (data) {
		if (data
			&& data.query
			&& data.query.diagnostics
			&& data.query.diagnostics.redirect) {
			HTMLPreview.send(data.query.diagnostics.redirect.content, 'loadHTML');
		}
		else if (data
			&& data.query
			&& data.query.results
			&& data.query.results.resources
			&& data.query.results.resources.content
			&& data.query.results.resources.status == 200) {
			HTMLPreview.content = data.query.results.resources.content.replace(/<head>/i, '<head><base href="' + HTMLPreview.raw() + '">').replace(/<script( type=["'](text|application)\/javascript["'])?/gi, '<script type="text/htmlpreview"').replace(/<\/body>/i, '<script src="' + location.href.split('?')[0] + '/htmlpreview.js"></script><script>HTMLPreview.replaceAssets();</script></body>').replace(/<\/head>\s*<frameset/gi, '<script src="' + location.href.split('?')[0] + '/htmlpreview.js"></script><script>document.addEventListener("DOMContentLoaded",HTMLPreview.replaceAssets,false);</script></head><frameset'); //Add <base> just after <head> and inject <script> just before </body> or </head> if <frameset>
			setTimeout(function () {
				document.open();
				document.write(HTMLPreview.content);
				document.close();
			}, 50); //Delay updating document to have it cleared before
		}
		else if (data
			&& data.error
			&& data.error.description) {
			HTMLPreview.previewform.innerHTML = data.error.description;
		}
		else
			HTMLPreview.previewform.innerHTML = 'Error: Cannot load file ' + HTMLPreview.raw();
	},

	loadCSS: function (data) {
		if (data
			&& data.query
			&& data.query.diagnostics
			&& data.query.diagnostics.redirect) {
			HTMLPreview.send(data.query.diagnostics.redirect.content, 'loadCSS');
		}
		else if (data
			&& data.query
			&& data.query.results
			&& data.query.results.resources
			&& data.query.results.resources.content
			&& data.query.results.resources.status == 200) {
			document.write('<style>' + data.query.results.resources.content.replace(/url\((?:'|")?([^\/][^:'"\)]+)(?:'|")?\)/gi, 'url(' + data.query.results.resources.url.replace(/[^\/]+\.css.*$/gi, '') + '$1)') + '</style>'); //If relative URL in CSS background-image property, then concatenate URL to CSS directory
		}
	},

	loadJS: function (data) {
		if (data
			&& data.query
			&& data.query.diagnostics
			&& data.query.diagnostics.redirect) {
			HTMLPreview.send(data.query.diagnostics.redirect.content, 'loadJS');
		}
		else if (data
			&& data.query
			&& data.query.results
			&& data.query.results.resources
			&& data.query.results.resources.content
			&& data.query.results.resources.status == 200) {
			document.write('<script>' + data.query.results.resources.content + '</script>');
		}
	},

	send: function (file, callback) {
		document.write('<script src="//query.yahooapis.com/v1/public/yql?q=use%20%22https%3A%2F%2Fraw.githubusercontent.com%2Fyql%2Fyql-tables%2Fmaster%2Fdata%2Fdata.headers.xml%22%20as%20headers%3B%20select%20*%20from%20headers%20where%20url%3D%22' + encodeURIComponent(file) + '%22&format=json&diagnostics=true&callback=HTMLPreview.' + callback + '"></script>'); //Get content using YQL
	},

	submitform: function () {
		location.href = location.href.split('?')[0] + '?' + document.getElementById('file').value;
		return false;
	},

	loading: function (opt) {
		let loadvalue = 0;
		HTMLPreview.interval = setInterval(function () {
			if (loadvalue >= 100) {
				clearInterval(HTMLPreview.interval);
			}
			if (HTMLPreview.previewform) {
				HTMLPreview.previewform.innerHTML = `<p>Loading ${opt}...</p><div class="progress"><div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="${loadvalue}" aria-valuemin="0" aria-valuemax="100" style="width: ${loadvalue}%"></div></div>`;	
			} else {
				clearInterval(HTMLPreview.interval);
			}
			loadvalue += 1;
		}, 20);
	},
	init: function () {
		HTMLPreview.previewform.onsubmit = HTMLPreview.submitform;
		if (HTMLPreview.file()) {
			if (HTMLPreview.file().indexOf('.html') === -1 && HTMLPreview.file().indexOf('?no-render=true') === -1) {
				HTMLPreview.getGistHtmlFile(HTMLPreview.file());
				return false;
			} else {
				HTMLPreview.send(HTMLPreview.raw(), 'loadHTML');
				HTMLPreview.loading();
			}
		}
	}
}