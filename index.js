const { get } = require("node-superfetch");
const { load } = require("cheerio");

module.exports = {
	searchPackageByName: async (name) => {
    try {
	    const { text } = await get(`https://www.npmjs.com/search?q=${name}`);
	    const $ = load(text);
      return Object.values($("section")).filter(x => x.attribs?.class == "ef4d7c63 flex-l pl1-ns pt3 pb2 ph1 bb b--black-10 ").map((x, y) => {
	  	  return {
		    	name: Object.values($("h3")).filter(z => z.attribs?.class == "db7ee1ac fw6 f4 black-90 dib lh-solid ma0 no-underline hover-black")[y]?.children[0]?.data || null,
		    	url: "https://www.npmjs.com/package/" + Object.values($("h3")).filter(z => z.attribs?.class == "db7ee1ac fw6 f4 black-90 dib lh-solid ma0 no-underline hover-black")[y]?.children[0]?.data || null,
		  	  author: {
			  	  name: Object.values($("a")).filter(z => z.attribs?.class == "e98ba1cc pl2 pr2 black-70 fw6 db hover-black no-underline")[y]?.children[0]?.data || null,
			    	url: "https://www.npmjs.com/~" + Object.values($("a")).filter(z => z.attribs?.class == "e98ba1cc pl2 pr2 black-70 fw6 db hover-black no-underline")[y]?.children[0]?.data || null
	    	  }
	      };
	    });
		} catch (err) {
			throw new Error("Failed to get information.");
		}
  },
	searchPackageByKeywords: async (keywords) => {
		try {
  	  const { text } = await get(`https://www.npmjs.com/search?q=keywords:${keywords.map(x => x.split(" ").join("%20")).join("%20")}`);
	    const $ = load(text);
      return Object.values($("section")).filter(x => x.attribs?.class == "ef4d7c63 flex-l pl1-ns pt3 pb2 ph1 bb b--black-10 ").map((x, y) => {
		    return {
			    name: Object.values($("h3")).filter(z => z.attribs?.class == "db7ee1ac fw6 f4 black-90 dib lh-solid ma0 no-underline hover-black")[y]?.children[0]?.data || null,
		    	url: "https://www.npmjs.com/package/" + Object.values($("h3")).filter(z => z.attribs?.class == "db7ee1ac fw6 f4 black-90 dib lh-solid ma0 no-underline hover-black")[y]?.children[0]?.data || null,
		    	author: {
			    	name: Object.values($("a")).filter(z => z.attribs?.class == "e98ba1cc pl2 pr2 black-70 fw6 db hover-black no-underline")[y]?.children[0]?.data || null,
			    	url: "https://www.npmjs.com/~" + Object.values($("a")).filter(z => z.attribs?.class == "e98ba1cc pl2 pr2 black-70 fw6 db hover-black no-underline")[y]?.children[0]?.data || null
	    	  }
	      };
	    });
		} catch (err) {
			throw new Error("Failed to get information.");
		}
  },
	getPackageInfo: async (name, options) => {
		try {
      let version = options?.version;
      const { text } = await get((version ? `https://www.npmjs.com/package/${name}/v/${version}` : `https://www.npmjs.com/package/${name}`));
	    const $ = load(text);
      return {
		    name: Object.values($("head meta")).find(x => x.attribs?.property == "og:title")?.attribs?.content || null,
        description: Object.values($("head meta")).find(x => x.attribs?.property == "og:description")?.attribs?.content?.split(". Latest version:")?.slice(0, -1)?.join(". Latest version:") || null,
	    	version: Object.values($("span")).find(x => x.attribs?.class == "_76473bea f6 dib ph0 pv2 mb2-ns black-80 nowrap f5 fw4 lh-copy")?.children[0]?.data || null,
	    	url: ("https://www.npmjs.com/package/" + Object.values($("head meta")).find(x => x.attribs?.property == "og:title")?.attribs?.content + (version ? ("/v/" + version) : "")) || null,
		  	deprecated: Object.values($("code")).find(x => x.attribs?.class == "_4b60b4d3 f5 fl pa1 ph2 br2 ba b--black-30") ? true : false,
			  deprecatedtext: Object.values($("code")).find(x => x.attribs?.class == "_4b60b4d3 f5 fl pa1 ph2 br2 ba b--black-30")?.children[0]?.data || null,
	  	  public: Object.values($("span")).find(x => x.attribs?.class == "_813b53b2 _76473bea f6 dib ph0 pv2 mb2-ns black-80 nowrap f5 fw4 lh-copy")?.children[0]?.data == "Public" ? true : false,
	    	published: Object.values($("span")).filter(x => x.attribs?.class == "_76473bea f6 dib ph0 pv2 mb2-ns black-80 nowrap f5 fw4 lh-copy")[1]?.children[1]?.children[0]?.data || null,
	  	  dependencies: Object.values($("li")).find(x => x.attribs?.class == "_8055e658 f5 fw5 tc pointer c1f85151")?.children[0]?.children[0]?.children[1]?.data || null,
	    	dependents: Object.values($("li")).find(x => x.attribs?.class == "_8055e658 f5 fw5 tc pointer _7cec0316")?.children[0]?.children[0]?.children[1]?.data || null,
	    	versions: Object.values($("li")).find(x => x.attribs?.class == "_8055e658 f5 fw5 tc pointer b4fcfd19")?.children[0]?.children[0]?.children[1]?.data || null,
		    keywords: Object.values($(".pv4 ul li a")).filter(x => x.type == "tag").map(x => x.children[0]?.data),
		    repository: Object.values($("a")).filter(x => x.attribs?.class == "b2812e30 f2874b88 fw6 mb3 mt2 truncate black-80 f4 link")[0]?.children[1]?.children[0]?.data || null,
	    	homepage: Object.values($("a")).filter(x => x.attribs?.class == "b2812e30 f2874b88 fw6 mb3 mt2 truncate black-80 f4 link")[1]?.children[1]?.data || null,
	     	weeklydownloads: Object.values($("p")).filter(x => x.attribs?.class == "_9ba9a726 f4 tl flex-auto fw6 black-80 ma0 pr2 pb1")[0]?.children[0]?.data || null,
	    	license: Object.values($("div")).filter(x => x.attribs?.class == "_702d723c dib w-50 bb b--black-10 pr2").filter(x => x.children[0]?.attribs?.class == "c84e15be f5 mt2 pt2 mb0").find(x => x.children[0]?.children[0]?.data == "License")?.children[1]?.children[0]?.data || null,
	    	unpackedsize: Object.values($("div")).filter(x => x.attribs?.class == "_702d723c dib w-50 bb b--black-10 pr2").filter(x => x.children[0]?.attribs?.class == "c84e15be f5 mt2 pt2 mb0").find(x => x.children[0]?.children[0]?.data == "Unpacked Size")?.children[1]?.children[0]?.data || null,
	    	totalfiles: Object.values($("div")).filter(x => x.attribs?.class == "_702d723c dib w-50 bb b--black-10 pr2").filter(x => x.children[0]?.attribs?.class == "c84e15be f5 mt2 pt2 mb0").find(x => x.children[0]?.children[0]?.data == "Total Files")?.children[1]?.children[0]?.data || null,
	    	lastpublish: Object.values($("div")).filter(x => x.attribs?.class == "_702d723c dib w-50 bb b--black-10 pr2 w-100").filter(x => x.children[0]?.attribs?.class == "c84e15be f5 mt2 pt2 mb0").find(x => x.children[0]?.children[0]?.data == "Last publish")?.children[1]?.children[0]?.children[0]?.data || null,
	  	  collaborators: Object.values($("ul li a img")).filter(x => x.parent?.name == "a").map(x => {
		    	return {
		  		  name: x.attribs?.title || null,
			    	icon: ("https://www.npmjs.com" + x.attribs?.src) || null,
			    	url: ("https://www.npmjs.com/~" + x.attribs?.title) || null
		    	};
	    	})
	  	};
		} catch (err) {
			throw new Error("Failed to get information.");
		}
  },
	getAccountInfo: async (username) => {
		try {
		  const { text } = await get(`https://www.npmjs.com/~${username}`);
	  	const $ = load(text);
	  	return {
		    name: Object.values($("h2")).filter(x => x.attribs?.class == "b219ea1a black tracked-tight fw6 mv1")[0]?.children[0]?.data || null,
		    icon: "https://www.npmjs.com" + Object.values($("img"))[0]?.attribs?.src || null,
		  	url: "https://www.npmjs.com/~" + Object.values($("h2")).filter(x => x.attribs?.class == "b219ea1a black tracked-tight fw6 mv1")[0]?.children[0]?.data || null,
	    	fullname: Object.values($("div")).filter(x => x.attribs?.class == "black-50 mv2")[0]?.children[0]?.data || null,
	      github: Object.values($("a")).filter(x => x.attribs?.class == "_00cd8e7e truncate no-underline pr1").find(x => x.attribs?.href?.startsWith("https://github.com"))?.children[0]?.data || null,
	    	twitter: Object.values($("a")).filter(x => x.attribs?.class == "_00cd8e7e truncate no-underline pr1").find(x => x.attribs?.href?.startsWith("https://twitter.com"))?.children[0]?.data || null,
        packages: (Object.values($("span")).filter(x => x.attribs?.class == "c3fc8940")[0].children[0].data + (Object.values($("span")).filter(x => x.attribs?.class == "c3fc8940")[0]?.children[0]?.data != "1" ? " Packages" : " Package")) || null,
	    	organizations: (Object.values($("span")).filter(x => x.attribs?.class == "c3fc8940")[1].children[0].data + (Object.values($("span")).filter(x => x.attribs?.class == "c3fc8940")[1]?.children[0]?.data != "1" ? " Organizations" : " Organization")) || null
	  	};
	  } catch (err) {
	    throw new Error("Failed to get information.");
  	}
	}
};