$estr = function() { return js.Boot.__string_rec(this,''); }
if(typeof haxe=='undefined') haxe = {}
if(!haxe.io) haxe.io = {}
haxe.io.BytesBuffer = function(p) {
	if( p === $_ ) return;
	this.b = new Array();
}
haxe.io.BytesBuffer.__name__ = ["haxe","io","BytesBuffer"];
haxe.io.BytesBuffer.prototype.b = null;
haxe.io.BytesBuffer.prototype.addByte = function($byte) {
	this.b.push($byte);
}
haxe.io.BytesBuffer.prototype.add = function(src) {
	var b1 = this.b;
	var b2 = src.b;
	var _g1 = 0, _g = src.length;
	while(_g1 < _g) {
		var i = _g1++;
		this.b.push(b2[i]);
	}
}
haxe.io.BytesBuffer.prototype.addBytes = function(src,pos,len) {
	if(pos < 0 || len < 0 || pos + len > src.length) throw haxe.io.Error.OutsideBounds;
	var b1 = this.b;
	var b2 = src.b;
	var _g1 = pos, _g = pos + len;
	while(_g1 < _g) {
		var i = _g1++;
		this.b.push(b2[i]);
	}
}
haxe.io.BytesBuffer.prototype.getBytes = function() {
	var bytes = new haxe.io.Bytes(this.b.length,this.b);
	this.b = null;
	return bytes;
}
haxe.io.BytesBuffer.prototype.__class__ = haxe.io.BytesBuffer;
if(typeof com=='undefined') com = {}
if(!com.wiris) com.wiris = {}
if(!com.wiris.quizzes) com.wiris.quizzes = {}
com.wiris.quizzes.HTMLGuiConfig = function(classes) {
	if( classes === $_ ) return;
	this.configClasses = new Array();
	this.openAnswerConfig();
	if(classes == null) classes = "";
	var classArray = classes.split(" ");
	var i;
	var _g1 = 0, _g = classArray.length;
	while(_g1 < _g) {
		var i1 = _g1++;
		var className = classArray[i1];
		if(className == com.wiris.quizzes.HTMLGuiConfig.WIRISMULTICHOICE) {
			this.multiChoiceConfig();
			this.configClasses.push(com.wiris.quizzes.HTMLGuiConfig.WIRISMULTICHOICE);
		} else if(className == com.wiris.quizzes.HTMLGuiConfig.WIRISOPENANSWER) {
			this.openAnswerConfig();
			this.configClasses.push(com.wiris.quizzes.HTMLGuiConfig.WIRISOPENANSWER);
		}
	}
}
com.wiris.quizzes.HTMLGuiConfig.__name__ = ["com","wiris","quizzes","HTMLGuiConfig"];
com.wiris.quizzes.HTMLGuiConfig.prototype.tabCorrectAnswer = null;
com.wiris.quizzes.HTMLGuiConfig.prototype.tabValidation = null;
com.wiris.quizzes.HTMLGuiConfig.prototype.tabVariables = null;
com.wiris.quizzes.HTMLGuiConfig.prototype.tabPreview = null;
com.wiris.quizzes.HTMLGuiConfig.prototype.configClasses = null;
com.wiris.quizzes.HTMLGuiConfig.prototype.openAnswerConfig = function() {
	this.tabCorrectAnswer = true;
	this.tabValidation = true;
	this.tabVariables = true;
	this.tabPreview = true;
}
com.wiris.quizzes.HTMLGuiConfig.prototype.multiChoiceConfig = function() {
	this.tabCorrectAnswer = false;
	this.tabValidation = false;
	this.tabVariables = true;
	this.tabPreview = false;
}
com.wiris.quizzes.HTMLGuiConfig.prototype.getClasses = function() {
	var sb = new StringBuf();
	var i;
	var _g1 = 0, _g = this.configClasses.length;
	while(_g1 < _g) {
		var i1 = _g1++;
		if(i1 > 0) sb.b[sb.b.length] = " " == null?"null":" ";
		sb.add(this.configClasses[i1]);
	}
	return sb.b.join("");
}
com.wiris.quizzes.HTMLGuiConfig.prototype.__class__ = com.wiris.quizzes.HTMLGuiConfig;
com.wiris.quizzes.Serializable = function(p) {
}
com.wiris.quizzes.Serializable.__name__ = ["com","wiris","quizzes","Serializable"];
com.wiris.quizzes.Serializable.prototype.onSerialize = function(s) {
}
com.wiris.quizzes.Serializable.prototype.newInstance = function() {
	return new com.wiris.quizzes.Serializable();
}
com.wiris.quizzes.Serializable.prototype.serialize = function() {
	var s = new com.wiris.quizzes.Serializer();
	return s.write(this);
}
com.wiris.quizzes.Serializable.prototype.__class__ = com.wiris.quizzes.Serializable;
com.wiris.quizzes.MathContent = function(p) {
	if( p === $_ ) return;
	com.wiris.quizzes.Serializable.call(this);
}
com.wiris.quizzes.MathContent.__name__ = ["com","wiris","quizzes","MathContent"];
com.wiris.quizzes.MathContent.__super__ = com.wiris.quizzes.Serializable;
for(var k in com.wiris.quizzes.Serializable.prototype ) com.wiris.quizzes.MathContent.prototype[k] = com.wiris.quizzes.Serializable.prototype[k];
com.wiris.quizzes.MathContent.getMathType = function(content) {
	content = StringTools.trim(content);
	var i;
	if(StringTools.startsWith(content,"<") && StringTools.endsWith(content,">")) {
		var mathmltags = ["math","mn","mo","mi","mrow","mfrac","mtext","ms","mroot","msqrt","mfenced","msub","msup","msubsup","mover","munder","munderover"];
		var _g1 = 0, _g = mathmltags.length;
		while(_g1 < _g) {
			var i1 = _g1++;
			if(StringTools.startsWith(content,"<" + mathmltags[i1])) return com.wiris.quizzes.MathContent.TYPE_MATHML;
		}
	}
	return com.wiris.quizzes.MathContent.TYPE_TEXT;
}
com.wiris.quizzes.MathContent.isEmpty = function(content) {
	content = StringTools.trim(content);
	if(StringTools.startsWith(content,"<math")) {
		content = content.substr(content.indexOf(">") + 1);
		content = content.substr(0,content.lastIndexOf("<"));
	}
	while(StringTools.startsWith(content,"<mrow")) {
		content = content.substr(content.indexOf(">") + 1);
		content = content.substr(0,content.lastIndexOf("<"));
	}
	return content.length == 0;
}
com.wiris.quizzes.MathContent.prototype.type = null;
com.wiris.quizzes.MathContent.prototype.content = null;
com.wiris.quizzes.MathContent.prototype.set = function(content) {
	this.type = com.wiris.quizzes.MathContent.getMathType(content);
	this.content = content;
}
com.wiris.quizzes.MathContent.prototype.onSerialize = function(s) {
	s.beginTag("math");
	this.onSerializeInner(s);
	s.endTag();
}
com.wiris.quizzes.MathContent.prototype.onSerializeInner = function(s) {
	this.type = s.attributeString("type",this.type,"text");
	this.content = s.textContent(this.content);
}
com.wiris.quizzes.MathContent.prototype.newInstance = function() {
	return new com.wiris.quizzes.MathContent();
}
com.wiris.quizzes.MathContent.prototype.__class__ = com.wiris.quizzes.MathContent;
com.wiris.quizzes.Option = function(p) {
	if( p === $_ ) return;
	com.wiris.quizzes.MathContent.call(this);
}
com.wiris.quizzes.Option.__name__ = ["com","wiris","quizzes","Option"];
com.wiris.quizzes.Option.__super__ = com.wiris.quizzes.MathContent;
for(var k in com.wiris.quizzes.MathContent.prototype ) com.wiris.quizzes.Option.prototype[k] = com.wiris.quizzes.MathContent.prototype[k];
com.wiris.quizzes.Option.prototype.name = null;
com.wiris.quizzes.Option.prototype.newInstance = function() {
	return new com.wiris.quizzes.Option();
}
com.wiris.quizzes.Option.prototype.onSerialize = function(s) {
	s.beginTag("option");
	this.name = s.attributeString("name",this.name,null);
	com.wiris.quizzes.MathContent.prototype.onSerializeInner.call(this,s);
	s.endTag();
}
com.wiris.quizzes.Option.prototype.__class__ = com.wiris.quizzes.Option;
com.wiris.quizzes.QuizzesService = function(url) {
	if( url === $_ ) return;
	this.protocol = com.wiris.quizzes.QuizzesService.PROTOCOL_REST;
	this.url = url;
	if(this.url == null) this.url = com.wiris.quizzes.QuizzesConfig.QUIZZES_SERVICE_URL;
}
com.wiris.quizzes.QuizzesService.__name__ = ["com","wiris","quizzes","QuizzesService"];
com.wiris.quizzes.QuizzesService.prototype.url = null;
com.wiris.quizzes.QuizzesService.prototype.protocol = null;
com.wiris.quizzes.QuizzesService.prototype.execute = function(req) {
	var mqr = new com.wiris.quizzes.MultipleQuestionRequest();
	mqr.questionRequests = new Array();
	mqr.questionRequests.push(req);
	var mqs = this.executeMultiple(mqr);
	if(mqs.questionResponses.length == 0) return new com.wiris.quizzes.QuestionResponse(); else return mqs.questionResponses[0];
}
com.wiris.quizzes.QuizzesService.prototype.executeMultiple = function(mqr) {
	var s = new com.wiris.quizzes.Serializer();
	var postData = s.write(mqr);
	postData = this.webServiceEnvelope(postData);
	var data = this.stripWebServiceEnvelope(this.callQuizzesService(postData));
	var res = com.wiris.quizzes.RequestBuilder.getInstance().newMultipleResponseFromXml(data);
	return res;
}
com.wiris.quizzes.QuizzesService.prototype.callQuizzesService = function(postData) {
	var http;
	if(com.wiris.settings.PlatformSettings.IS_JAVASCRIPT) {
		var url = com.wiris.quizzes.QuizzesConfig.QUIZZES_PROXY_URL;
		http = new com.wiris.quizzes.HttpImpl(url);
		http.setParameter("service","quizzes");
		http.setParameter("rawpostdata","true");
		http.setParameter("postdata",postData);
		http.setHeader("Connection","close");
		http.setHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
	} else {
		var url = this.getServiceUrl();
		http = new com.wiris.quizzes.HttpImpl(url);
		http.setHeader("Content-Length","" + postData.length);
		http.setHeader("Connection","close");
		http.setHeader("Content-Type","text/xml; charset=UTF-8");
		http.setPostData("\r\n" + postData);
	}
	http.request(true);
	var response = http.response;
	if(this.isFault(response)) throw "Remote exception: " + this.getFaultMessage(response);
	return response;
}
com.wiris.quizzes.QuizzesService.prototype.isFault = function(response) {
	if(this.protocol == com.wiris.quizzes.QuizzesService.PROTOCOL_REST) return response.indexOf("<fault>") != -1;
	return false;
}
com.wiris.quizzes.QuizzesService.prototype.getFaultMessage = function(response) {
	if(this.protocol == com.wiris.quizzes.QuizzesService.PROTOCOL_REST) {
		var start = response.indexOf("<fault>") + 7;
		var end = response.indexOf("</fault>");
		var msg = response.substr(start,end - start);
		return com.wiris.util.xml.WXmlUtils.htmlUnescape(msg);
	}
	return response;
}
com.wiris.quizzes.QuizzesService.prototype.webServiceEnvelope = function(data) {
	if(this.protocol == com.wiris.quizzes.QuizzesService.PROTOCOL_REST) data = "<doProcessQuestions>" + data + "</doProcessQuestions>";
	return data;
}
com.wiris.quizzes.QuizzesService.prototype.stripWebServiceEnvelope = function(data) {
	if(this.protocol == com.wiris.quizzes.QuizzesService.PROTOCOL_REST) {
		var startTagName = "doProcessQuestionsResponse";
		var start = data.indexOf("<" + startTagName + ">") + startTagName.length + 2;
		var end = data.indexOf("</" + startTagName + ">");
		data = data.substr(start,end - start);
	}
	return data;
}
com.wiris.quizzes.QuizzesService.prototype.getServiceUrl = function() {
	var url = this.url;
	if(this.protocol == com.wiris.quizzes.QuizzesService.PROTOCOL_REST) url += "/rest";
	return url;
}
com.wiris.quizzes.QuizzesService.prototype.__class__ = com.wiris.quizzes.QuizzesService;
haxe.Http = function(url) {
	if( url === $_ ) return;
	this.url = url;
	this.headers = new Hash();
	this.params = new Hash();
	this.async = true;
}
haxe.Http.__name__ = ["haxe","Http"];
haxe.Http.requestUrl = function(url) {
	var h = new haxe.Http(url);
	h.async = false;
	var r = null;
	h.onData = function(d) {
		r = d;
	};
	h.onError = function(e) {
		throw e;
	};
	h.request(false);
	return r;
}
haxe.Http.prototype.url = null;
haxe.Http.prototype.async = null;
haxe.Http.prototype.postData = null;
haxe.Http.prototype.headers = null;
haxe.Http.prototype.params = null;
haxe.Http.prototype.setHeader = function(header,value) {
	this.headers.set(header,value);
}
haxe.Http.prototype.setParameter = function(param,value) {
	this.params.set(param,value);
}
haxe.Http.prototype.setPostData = function(data) {
	this.postData = data;
}
haxe.Http.prototype.request = function(post) {
	var me = this;
	var r = new js.XMLHttpRequest();
	var onreadystatechange = function() {
		if(r.readyState != 4) return;
		var s = (function($this) {
			var $r;
			try {
				$r = r.status;
			} catch( e ) {
				$r = null;
			}
			return $r;
		}(this));
		if(s == undefined) s = null;
		if(s != null) me.onStatus(s);
		if(s != null && s >= 200 && s < 400) me.onData(r.responseText); else switch(s) {
		case null: case undefined:
			me.onError("Failed to connect or resolve host");
			break;
		case 12029:
			me.onError("Failed to connect to host");
			break;
		case 12007:
			me.onError("Unknown host");
			break;
		default:
			me.onError("Http Error #" + r.status);
		}
	};
	if(this.async) r.onreadystatechange = onreadystatechange;
	var uri = this.postData;
	if(uri != null) post = true; else {
		var $it0 = this.params.keys();
		while( $it0.hasNext() ) {
			var p = $it0.next();
			if(uri == null) uri = ""; else uri += "&";
			uri += StringTools.urlDecode(p) + "=" + StringTools.urlEncode(this.params.get(p));
		}
	}
	try {
		if(post) r.open("POST",this.url,this.async); else if(uri != null) {
			var question = this.url.split("?").length <= 1;
			r.open("GET",this.url + (question?"?":"&") + uri,this.async);
			uri = null;
		} else r.open("GET",this.url,this.async);
	} catch( e ) {
		this.onError(e.toString());
		return;
	}
	if(this.headers.get("Content-Type") == null && post && this.postData == null) r.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	var $it1 = this.headers.keys();
	while( $it1.hasNext() ) {
		var h = $it1.next();
		r.setRequestHeader(h,this.headers.get(h));
	}
	r.send(uri);
	if(!this.async) onreadystatechange();
}
haxe.Http.prototype.onData = function(data) {
}
haxe.Http.prototype.onError = function(msg) {
}
haxe.Http.prototype.onStatus = function(status) {
}
haxe.Http.prototype.__class__ = haxe.Http;
com.wiris.quizzes.Serializer = function(p) {
	if( p === $_ ) return;
	this.tags = new Hash();
	this.elementStack = new Array();
	this.childrenStack = new Array();
	this.childStack = new Array();
}
com.wiris.quizzes.Serializer.__name__ = ["com","wiris","quizzes","Serializer"];
com.wiris.quizzes.Serializer.getXmlTextContent = function(element) {
	if(element.nodeType == Xml.CData || element.nodeType == Xml.PCData) {
		var value = element.getNodeValue();
		if(com.wiris.settings.PlatformSettings.PARSE_XML_ENTITIES && element.nodeType == Xml.PCData) value = com.wiris.util.xml.WXmlUtils.htmlUnescape(value);
		return value;
	} else if(element.nodeType == Xml.Document || element.nodeType == Xml.Element) {
		var sb = new StringBuf();
		var children = element.iterator();
		while(children.hasNext()) sb.add(com.wiris.quizzes.Serializer.getXmlTextContent(children.next()));
		return sb.b.join("");
	} else return "";
}
com.wiris.quizzes.Serializer.parseBoolean = function(s) {
	return s.toLowerCase() == "true" || s == "1";
}
com.wiris.quizzes.Serializer.booleanToString = function(b) {
	return b?"true":"false";
}
com.wiris.quizzes.Serializer.prototype.mode = null;
com.wiris.quizzes.Serializer.prototype.element = null;
com.wiris.quizzes.Serializer.prototype.children = null;
com.wiris.quizzes.Serializer.prototype.child = null;
com.wiris.quizzes.Serializer.prototype.elementStack = null;
com.wiris.quizzes.Serializer.prototype.childrenStack = null;
com.wiris.quizzes.Serializer.prototype.childStack = null;
com.wiris.quizzes.Serializer.prototype.tags = null;
com.wiris.quizzes.Serializer.prototype.currentTag = null;
com.wiris.quizzes.Serializer.prototype.read = function(xml) {
	var document = com.wiris.util.xml.WXmlUtils.parseXML(xml);
	this.setCurrentElement(document.firstElement());
	this.mode = com.wiris.quizzes.Serializer.MODE_READ;
	return this.readNode();
}
com.wiris.quizzes.Serializer.prototype.write = function(s) {
	this.mode = com.wiris.quizzes.Serializer.MODE_WRITE;
	this.element = Xml.createDocument();
	s.onSerialize(this);
	var res = com.wiris.util.xml.WXmlUtils.serializeXML(this.element);
	return res;
}
com.wiris.quizzes.Serializer.prototype.beginTag = function(tag) {
	if(this.mode == com.wiris.quizzes.Serializer.MODE_READ) return tag == this.element.getNodeName(); else if(this.mode == com.wiris.quizzes.Serializer.MODE_WRITE) {
		var child = Xml.createElement(tag);
		this.element.addChild(child);
		this.element = child;
	} else if(this.mode == com.wiris.quizzes.Serializer.MODE_REGISTER && this.currentTag == null) this.currentTag = tag;
	return true;
}
com.wiris.quizzes.Serializer.prototype.childString = function(name,value,def) {
	if(this.mode == com.wiris.quizzes.Serializer.MODE_READ) {
		var child = this.currentChild();
		if(child != null && child.getNodeName() == name) {
			value = com.wiris.quizzes.Serializer.getXmlTextContent(child);
			this.nextChild();
		} else value = def;
	} else if(this.mode == com.wiris.quizzes.Serializer.MODE_WRITE) {
		if(value != null && !(value == def)) {
			this.beginTag(name);
			this.textContent(value);
			this.endTag();
		} else if(value == null && def != null) {
			this.beginTag(name);
			this.endTag();
		}
	}
	return value;
}
com.wiris.quizzes.Serializer.prototype.endTag = function() {
	if(this.mode == com.wiris.quizzes.Serializer.MODE_READ) this.element = this.element.getParent(); else if(this.mode == com.wiris.quizzes.Serializer.MODE_WRITE) this.element = this.element.getParent();
}
com.wiris.quizzes.Serializer.prototype.attributeString = function(name,value,def) {
	if(this.mode == com.wiris.quizzes.Serializer.MODE_READ) {
		value = this.element.get(name);
		if(value == null) value = def;
	} else if(this.mode == com.wiris.quizzes.Serializer.MODE_WRITE) {
		if(value != null && !(value == def)) this.element.set(name,value);
	}
	return value;
}
com.wiris.quizzes.Serializer.prototype.attributeBoolean = function(name,value,def) {
	return com.wiris.quizzes.Serializer.parseBoolean(this.attributeString(name,com.wiris.quizzes.Serializer.booleanToString(value),com.wiris.quizzes.Serializer.booleanToString(def)));
}
com.wiris.quizzes.Serializer.prototype.attributeInt = function(name,value,def) {
	return Std.parseInt(this.attributeString(name,"" + value,"" + def));
}
com.wiris.quizzes.Serializer.prototype.attributeFloat = function(name,value,def) {
	return Std.parseFloat(this.attributeString(name,"" + value,"" + def));
}
com.wiris.quizzes.Serializer.prototype.textContent = function(content) {
	if(this.mode == com.wiris.quizzes.Serializer.MODE_READ) content = com.wiris.quizzes.Serializer.getXmlTextContent(this.element); else if(this.mode == com.wiris.quizzes.Serializer.MODE_WRITE && content != null) {
		var textNode;
		var xmlContent = content;
		if(com.wiris.settings.PlatformSettings.PARSE_XML_ENTITIES) xmlContent = com.wiris.util.xml.WXmlUtils.htmlEscape(xmlContent);
		textNode = Xml.createPCData(xmlContent);
		this.element.addChild(textNode);
	}
	return content;
}
com.wiris.quizzes.Serializer.prototype.booleanContent = function(content) {
	if(this.mode == com.wiris.quizzes.Serializer.MODE_READ) content = com.wiris.quizzes.Serializer.parseBoolean(com.wiris.quizzes.Serializer.getXmlTextContent(this.element)); else if(this.mode == com.wiris.quizzes.Serializer.MODE_WRITE) {
		var textNode = Xml.createPCData(com.wiris.quizzes.Serializer.booleanToString(content));
		this.element.addChild(textNode);
	}
	return content;
}
com.wiris.quizzes.Serializer.prototype.serializeChild = function(s) {
	if(this.mode == com.wiris.quizzes.Serializer.MODE_READ) {
		var child = this.currentChild();
		if(child != null) {
			this.pushState();
			this.setCurrentElement(child);
			s = this.readNode();
			this.popState();
			this.nextChild();
		} else s = null;
	} else if(this.mode == com.wiris.quizzes.Serializer.MODE_WRITE && s != null) ((function($this) {
		var $r;
		var $t = s;
		if(Std["is"]($t,com.wiris.quizzes.Serializable)) $t; else throw "Class cast error";
		$r = $t;
		return $r;
	}(this))).onSerialize(this);
	return s;
}
com.wiris.quizzes.Serializer.prototype.serializeArray = function(array,tagName) {
	if(this.mode == com.wiris.quizzes.Serializer.MODE_READ) {
		array = new Array();
		var child = this.currentChild();
		if(child != null) {
			if(tagName == null) tagName = child.getNodeName();
			while(child != null && tagName == child.getNodeName()) {
				this.pushState();
				this.setCurrentElement(child);
				var elem = this.readNode();
				array.push(elem);
				this.popState();
				child = this.nextChild();
			}
		}
	} else if(this.mode == com.wiris.quizzes.Serializer.MODE_WRITE && array != null && array.length > 0) {
		var items = array.iterator();
		while(items.hasNext()) ((function($this) {
			var $r;
			var $t = items.next();
			if(Std["is"]($t,com.wiris.quizzes.Serializable)) $t; else throw "Class cast error";
			$r = $t;
			return $r;
		}(this))).onSerialize(this);
	}
	return array;
}
com.wiris.quizzes.Serializer.prototype.serializeChildName = function(s,tagName) {
	if(this.mode == com.wiris.quizzes.Serializer.MODE_READ) {
		var child = this.currentChild();
		if(child != null && child.getNodeName() == tagName) s = this.serializeChild(s);
	} else if(this.mode == com.wiris.quizzes.Serializer.MODE_WRITE) s = this.serializeChild(s);
	return s;
}
com.wiris.quizzes.Serializer.prototype.serializeArrayName = function(array,tagName) {
	if(this.mode == com.wiris.quizzes.Serializer.MODE_READ) {
		var child = this.currentChild();
		if(child != null && child.getNodeName() == tagName) {
			this.pushState();
			this.setCurrentElement(child);
			array = this.serializeArray(array,null);
			this.popState();
			this.nextChild();
		}
	} else if(this.mode == com.wiris.quizzes.Serializer.MODE_WRITE && array != null && array.length > 0) {
		var element = this.element;
		this.element = Xml.createElement(tagName);
		element.addChild(this.element);
		array = this.serializeArray(array,null);
		this.element = element;
	}
	return array;
}
com.wiris.quizzes.Serializer.prototype.register = function(elem) {
	this.tags.set(this.getTagName(elem),elem);
}
com.wiris.quizzes.Serializer.prototype.getTagName = function(elem) {
	var mode = this.mode;
	this.mode = com.wiris.quizzes.Serializer.MODE_REGISTER;
	this.currentTag = null;
	elem.onSerialize(this);
	this.mode = mode;
	return this.currentTag;
}
com.wiris.quizzes.Serializer.prototype.readNode = function() {
	if(!this.tags.exists(this.element.getNodeName())) throw "Tag " + this.element.getNodeName() + " not registered.";
	var model = this.tags.get(this.element.getNodeName());
	var node = model.newInstance();
	node.onSerialize(this);
	return node;
}
com.wiris.quizzes.Serializer.prototype.setCurrentElement = function(element) {
	this.element = element;
	this.children = this.element.elements();
	this.child = null;
}
com.wiris.quizzes.Serializer.prototype.nextChild = function() {
	if(this.children.hasNext()) this.child = this.children.next(); else this.child = null;
	return this.child;
}
com.wiris.quizzes.Serializer.prototype.currentChild = function() {
	if(this.child == null && this.children.hasNext()) this.child = this.children.next();
	return this.child;
}
com.wiris.quizzes.Serializer.prototype.pushState = function() {
	this.elementStack.push(this.element);
	this.childrenStack.push(this.children);
	this.childStack.push(this.child);
}
com.wiris.quizzes.Serializer.prototype.popState = function() {
	this.element = this.elementStack.pop();
	this.children = this.childrenStack.pop();
	this.child = this.childStack.pop();
}
com.wiris.quizzes.Serializer.prototype.serializeIntName = function(tagName,value,def) {
	if(this.mode == com.wiris.quizzes.Serializer.MODE_READ && this.currentChild() != null && this.child.getNodeName() == tagName || this.mode == com.wiris.quizzes.Serializer.MODE_WRITE && value != def) {
		this.beginTag(tagName);
		var content = this.textContent("" + value);
		value = Std.parseInt(content);
		this.endTag();
	}
	return value;
}
com.wiris.quizzes.Serializer.prototype.__class__ = com.wiris.quizzes.Serializer;
List = function(p) {
	if( p === $_ ) return;
	this.length = 0;
}
List.__name__ = ["List"];
List.prototype.h = null;
List.prototype.q = null;
List.prototype.length = null;
List.prototype.add = function(item) {
	var x = [item];
	if(this.h == null) this.h = x; else this.q[1] = x;
	this.q = x;
	this.length++;
}
List.prototype.push = function(item) {
	var x = [item,this.h];
	this.h = x;
	if(this.q == null) this.q = x;
	this.length++;
}
List.prototype.first = function() {
	return this.h == null?null:this.h[0];
}
List.prototype.last = function() {
	return this.q == null?null:this.q[0];
}
List.prototype.pop = function() {
	if(this.h == null) return null;
	var x = this.h[0];
	this.h = this.h[1];
	if(this.h == null) this.q = null;
	this.length--;
	return x;
}
List.prototype.isEmpty = function() {
	return this.h == null;
}
List.prototype.clear = function() {
	this.h = null;
	this.q = null;
	this.length = 0;
}
List.prototype.remove = function(v) {
	var prev = null;
	var l = this.h;
	while(l != null) {
		if(l[0] == v) {
			if(prev == null) this.h = l[1]; else prev[1] = l[1];
			if(this.q == l) this.q = prev;
			this.length--;
			return true;
		}
		prev = l;
		l = l[1];
	}
	return false;
}
List.prototype.iterator = function() {
	return { h : this.h, hasNext : function() {
		return this.h != null;
	}, next : function() {
		if(this.h == null) return null;
		var x = this.h[0];
		this.h = this.h[1];
		return x;
	}};
}
List.prototype.toString = function() {
	var s = new StringBuf();
	var first = true;
	var l = this.h;
	s.b[s.b.length] = "{" == null?"null":"{";
	while(l != null) {
		if(first) first = false; else s.b[s.b.length] = ", " == null?"null":", ";
		s.add(Std.string(l[0]));
		l = l[1];
	}
	s.b[s.b.length] = "}" == null?"null":"}";
	return s.b.join("");
}
List.prototype.join = function(sep) {
	var s = new StringBuf();
	var first = true;
	var l = this.h;
	while(l != null) {
		if(first) first = false; else s.b[s.b.length] = sep == null?"null":sep;
		s.add(l[0]);
		l = l[1];
	}
	return s.b.join("");
}
List.prototype.filter = function(f) {
	var l2 = new List();
	var l = this.h;
	while(l != null) {
		var v = l[0];
		l = l[1];
		if(f(v)) l2.add(v);
	}
	return l2;
}
List.prototype.map = function(f) {
	var b = new List();
	var l = this.h;
	while(l != null) {
		var v = l[0];
		l = l[1];
		b.add(f(v));
	}
	return b;
}
List.prototype.__class__ = List;
com.wiris.quizzes.JsInputController = function(element,question,questionElement,instance,instanceElement) {
	if( element === $_ ) return;
	this.element = element;
	this.question = question;
	this.questionElement = questionElement;
	this.instance = instance;
	this.instanceElement = instanceElement;
}
com.wiris.quizzes.JsInputController.__name__ = ["com","wiris","quizzes","JsInputController"];
com.wiris.quizzes.JsInputController.parseBool = function(b) {
	return b.toLowerCase() == "true";
}
com.wiris.quizzes.JsInputController.addEvent = function(element,event,func) {
	if(element.addEventListener) element.addEventListener(event,func,false); else if(element.attachEvent) element.attachEvent("on" + event,func);
}
com.wiris.quizzes.JsInputController.getElementWindow = function(element) {
	try {
		var doc = element.ownerDocument;
		var win;
		if('defaultView' in doc) return doc.defaultView; else if('parentWindow' in doc) return doc.parentWindow; else throw "Incompatible browser!";
	} catch( e ) {
		return null;
	}
}
com.wiris.quizzes.JsInputController.prototype.question = null;
com.wiris.quizzes.JsInputController.prototype.instance = null;
com.wiris.quizzes.JsInputController.prototype.questionElement = null;
com.wiris.quizzes.JsInputController.prototype.instanceElement = null;
com.wiris.quizzes.JsInputController.prototype.element = null;
com.wiris.quizzes.JsInputController.prototype.popup = null;
com.wiris.quizzes.JsInputController.prototype.mode = null;
com.wiris.quizzes.JsInputController.prototype.appletTimer = null;
com.wiris.quizzes.JsInputController.prototype.auxAppletValue = null;
com.wiris.quizzes.JsInputController.prototype.init = function() {
	this.mode = com.wiris.quizzes.JsInputController.SET;
	var value = this.getQuestionValue();
	this.inputValue(value);
	this.setBehavior();
	var updateInterface = true;
	var name = this.element.nodeName.toLowerCase();
	if(name == "input") {
		var felem = this.element;
		var type = felem.type.toLowerCase();
		if(type == "button" || type == "submit") updateInterface = false;
	} else if(name == "a" || name == "button") updateInterface = false;
	if(updateInterface) this.updateInterface(value);
}
com.wiris.quizzes.JsInputController.prototype.term = function() {
	if(this.appletTimer != null) {
		this.appletTimer.stop();
		this.appletTimer = null;
	}
}
com.wiris.quizzes.JsInputController.prototype.setQuestionValue = function(value) {
}
com.wiris.quizzes.JsInputController.prototype.getQuestionValue = function() {
	return "";
}
com.wiris.quizzes.JsInputController.prototype.updateInterface = function(value) {
}
com.wiris.quizzes.JsInputController.prototype.saveInputValue = function() {
	this.mode = com.wiris.quizzes.JsInputController.GET;
	var value = this.inputValue(null);
	this.setQuestionValue(value);
	if(com.wiris.quizzes.JsInputController.DEBUG) {
		if(this.question != null && this.questionElement != null) this.questionElement.value = this.question.serialize();
		if(this.instance != null && this.instanceElement != null) this.instanceElement.value = this.instance.serialize();
	}
}
com.wiris.quizzes.JsInputController.prototype.updateInputValue = function() {
	this.mode = com.wiris.quizzes.JsInputController.GET;
	var value = this.inputValue(null);
	this.setQuestionValue(value);
	this.updateInterface(value);
	if(com.wiris.quizzes.JsInputController.DEBUG) {
		if(this.question != null && this.questionElement != null) this.questionElement.value = this.question.serialize();
		if(this.instance != null && this.instanceElement != null) this.instanceElement.value = this.instance.serialize();
	}
}
com.wiris.quizzes.JsInputController.prototype.hideElementValue = function() {
	var name = this.element.nodeName.toLowerCase();
	if(name == "input" || name == "textarea" || name == "select" || name == "button") {
		var formElem = this.element;
		formElem.name = "";
	}
}
com.wiris.quizzes.JsInputController.prototype.inputValue = function(value) {
	var name = this.element.nodeName.toLowerCase();
	if(name == "input") {
		var type = this.element.getAttribute("type").toLowerCase();
		if(type == "checkbox" || type == "radio") value = this.checkedValue("checked",value); else if(type == "hidden" || type == "text") value = this.valueValue("value",value);
	} else if(name == "textarea") value = this.valueValue("value",value); else if(name == "select") value = this.selectedValue(value); else if(name == "applet") value = this.appletValue(value);
	return value;
}
com.wiris.quizzes.JsInputController.prototype.checkedValue = function(name,value) {
	var elem = this.element;
	if(this.mode == com.wiris.quizzes.JsInputController.GET) value = Std.string(elem.checked); else if(this.mode == com.wiris.quizzes.JsInputController.SET) elem.checked = value != null && value.toLowerCase() == "true";
	return value;
}
com.wiris.quizzes.JsInputController.prototype.valueValue = function(name,value) {
	var elem = this.element;
	if(this.mode == com.wiris.quizzes.JsInputController.GET) value = elem.value; else if(this.mode == com.wiris.quizzes.JsInputController.SET) elem.value = value == null?"":value;
	return value;
}
com.wiris.quizzes.JsInputController.prototype.selectedValue = function(value) {
	var elem = this.element;
	if(this.mode == com.wiris.quizzes.JsInputController.GET) value = elem.options[elem.selectedIndex].value; else if(this.mode == com.wiris.quizzes.JsInputController.SET) {
		var index;
		var _g1 = 0, _g = elem.options.length;
		while(_g1 < _g) {
			var index1 = _g1++;
			if(elem.options[index1].value == value) elem.selectedIndex = index1;
		}
	}
	return value;
}
com.wiris.quizzes.JsInputController.prototype.isAppletActive = function() {
	try {
		return this.element.isActive();
	} catch( e ) {
		return false;
	}
}
com.wiris.quizzes.JsInputController.prototype.appletValue = function(value) {
	if(this.mode == com.wiris.quizzes.JsInputController.GET) {
		if(this.isAppletActive()) this.auxAppletValue = this.element.getXml();
		return this.auxAppletValue;
	} else if(this.mode == com.wiris.quizzes.JsInputController.SET) {
		this.auxAppletValue = value;
		this.setAppletValue();
	}
	return value;
}
com.wiris.quizzes.JsInputController.prototype.setAppletValue = function() {
	try {
		if(this.isAppletActive()) {
			this.element.setXml(this.auxAppletValue);
			if(this.appletTimer != null) {
				this.appletTimer.stop();
				this.appletTimer = null;
			}
		} else if(this.appletTimer == null) {
			this.appletTimer = new haxe.Timer(200);
			this.appletTimer.run = $closure(this,"setAppletValue");
		}
		if(com.wiris.quizzes.JsInputController.getElementWindow(this.element) == null) this.term();
	} catch( e ) {
		this.term();
	}
}
com.wiris.quizzes.JsInputController.prototype.contentValue = function(value) {
	if(this.mode == com.wiris.quizzes.JsInputController.GET) value = this.element.innerHTML; else if(this.mode == com.wiris.quizzes.JsInputController.SET) this.element.innerHTML = value;
	return value;
}
com.wiris.quizzes.JsInputController.prototype.setBehavior = function() {
	var name = this.element.nodeName.toLowerCase();
	var type = null;
	if(name == "input") {
		var input = this.element;
		type = input.type.toLowerCase();
	}
	if(name == "input" && (type == "text" || type == "hidden" || type == "radio" || type == "checkbox") || name == "textarea" || name == "select") com.wiris.quizzes.JsInputController.addEvent(this.element,"change",$closure(this,"updateInputValue")); else if(name == "applet") com.wiris.quizzes.JsInputController.addEvent(this.element,"blur",$closure(this,"updateInputValue")); else if(name == "a" || name == "input" && type == "button" || name == "button") com.wiris.quizzes.JsInputController.addEvent(this.element,"click",$closure(this,"updateInputValue")); else if(com.wiris.quizzes.JsInputController.DEBUG) throw "Unsupported element " + name + ".";
}
com.wiris.quizzes.JsInputController.prototype.__class__ = com.wiris.quizzes.JsInputController;
com.wiris.quizzes.LocalData = function(p) {
	if( p === $_ ) return;
	com.wiris.quizzes.Serializable.call(this);
}
com.wiris.quizzes.LocalData.__name__ = ["com","wiris","quizzes","LocalData"];
com.wiris.quizzes.LocalData.__super__ = com.wiris.quizzes.Serializable;
for(var k in com.wiris.quizzes.Serializable.prototype ) com.wiris.quizzes.LocalData.prototype[k] = com.wiris.quizzes.Serializable.prototype[k];
com.wiris.quizzes.LocalData.prototype.name = null;
com.wiris.quizzes.LocalData.prototype.value = null;
com.wiris.quizzes.LocalData.prototype.onSerialize = function(s) {
	s.beginTag(com.wiris.quizzes.LocalData.tagName);
	this.name = s.attributeString("name",this.name,null);
	this.value = s.textContent(this.value);
	s.endTag();
}
com.wiris.quizzes.LocalData.prototype.newInstance = function() {
	return new com.wiris.quizzes.LocalData();
}
com.wiris.quizzes.LocalData.prototype.__class__ = com.wiris.quizzes.LocalData;
com.wiris.quizzes.QuestionInstance = function(p) {
	if( p === $_ ) return;
	com.wiris.quizzes.Serializable.call(this);
	this.userData = new com.wiris.quizzes.UserData();
	this.userData.randomSeed = Std.random(65536);
	this.variables = null;
	this.checks = null;
}
com.wiris.quizzes.QuestionInstance.__name__ = ["com","wiris","quizzes","QuestionInstance"];
com.wiris.quizzes.QuestionInstance.__super__ = com.wiris.quizzes.Serializable;
for(var k in com.wiris.quizzes.Serializable.prototype ) com.wiris.quizzes.QuestionInstance.prototype[k] = com.wiris.quizzes.Serializable.prototype[k];
com.wiris.quizzes.QuestionInstance.prototype.userData = null;
com.wiris.quizzes.QuestionInstance.prototype.variables = null;
com.wiris.quizzes.QuestionInstance.prototype.checks = null;
com.wiris.quizzes.QuestionInstance.prototype.onSerialize = function(s) {
	s.beginTag(com.wiris.quizzes.QuestionInstance.tagName);
	this.userData = s.serializeChildName(this.userData,com.wiris.quizzes.UserData.tagName);
	this.checks = this.checksToHash(s.serializeArrayName(this.hashToChecks(this.checks,null),"checks"),null);
	this.variables = this.variablesToHash(s.serializeArrayName(this.hashToVariables(this.variables,null),"variables"),null);
	s.endTag();
}
com.wiris.quizzes.QuestionInstance.prototype.newInstance = function() {
	return new com.wiris.quizzes.QuestionInstance();
}
com.wiris.quizzes.QuestionInstance.prototype.expandVariables = function(text) {
	if(text == null) return null;
	var h = new com.wiris.quizzes.HTMLTools();
	return h.expandVariables(text,this.variables);
}
com.wiris.quizzes.QuestionInstance.prototype.expandVariablesEquation = function(equation) {
	var h = new com.wiris.quizzes.HTMLTools();
	if(com.wiris.quizzes.MathContent.getMathType(equation) == com.wiris.quizzes.MathContent.TYPE_TEXT) equation = h.textToMathML(equation);
	return h.expandVariables(equation,this.variables);
}
com.wiris.quizzes.QuestionInstance.prototype.update = function(qs) {
	if(qs != null && qs.results != null) {
		var variables = false;
		var checks = false;
		var i;
		var _g1 = 0, _g = qs.results.length;
		while(_g1 < _g) {
			var i1 = _g1++;
			var r = qs.results[i1];
			var s = com.wiris.quizzes.RequestBuilder.getInstance().getSerializer();
			var tag = s.getTagName(r);
			if(tag == com.wiris.quizzes.ResultGetVariables.tagName) {
				if(!variables) {
					variables = true;
					this.variables = null;
				}
				var rgv = (function($this) {
					var $r;
					var $t = r;
					if(Std["is"]($t,com.wiris.quizzes.ResultGetVariables)) $t; else throw "Class cast error";
					$r = $t;
					return $r;
				}(this));
				this.variables = this.variablesToHash(rgv.variables,this.variables);
			} else if(tag == com.wiris.quizzes.ResultGetCheckAssertions.tagName) {
				if(!checks) {
					checks = true;
					this.checks = null;
				}
				var rgca = (function($this) {
					var $r;
					var $t = r;
					if(Std["is"]($t,com.wiris.quizzes.ResultGetCheckAssertions)) $t; else throw "Class cast error";
					$r = $t;
					return $r;
				}(this));
				this.checks = this.checksToHash(rgca.checks,this.checks);
			}
		}
	}
}
com.wiris.quizzes.QuestionInstance.prototype.clearVariables = function() {
	this.variables = null;
}
com.wiris.quizzes.QuestionInstance.prototype.clearChecks = function() {
	this.checks = null;
}
com.wiris.quizzes.QuestionInstance.prototype.hasVariables = function() {
	return this.variables != null && this.variables.keys().hasNext();
}
com.wiris.quizzes.QuestionInstance.prototype.hasEvaluation = function() {
	return this.checks != null && this.checks.keys().hasNext();
}
com.wiris.quizzes.QuestionInstance.prototype.isAnswerMatching = function(correctAnswer,answer) {
	var correct = true;
	var checks = this.checks.get(answer + "");
	var i;
	var _g1 = 0, _g = checks.length;
	while(_g1 < _g) {
		var i1 = _g1++;
		var c = checks[i1];
		if(c.correctAnswer == correctAnswer) correct = correct && c.value;
	}
	return correct;
}
com.wiris.quizzes.QuestionInstance.prototype.isAnswerCorrect = function(answer) {
	var correct = true;
	var checks = this.checks.get(answer + "");
	var i;
	var _g1 = 0, _g = checks.length;
	while(_g1 < _g) {
		var i1 = _g1++;
		correct = correct && checks[i1].value;
	}
	return correct;
}
com.wiris.quizzes.QuestionInstance.prototype.isAnswerSyntaxCorrect = function(answer) {
	var correct = true;
	var checks = this.checks.get(answer + "");
	var i;
	var _g1 = 0, _g = checks.length;
	while(_g1 < _g) {
		var i1 = _g1++;
		var ac = checks[i1];
		var j;
		var _g3 = 0, _g2 = com.wiris.quizzes.Assertion.syntactic.length;
		while(_g3 < _g2) {
			var j1 = _g3++;
			if(ac.assertion == com.wiris.quizzes.Assertion.syntactic[j1]) correct = correct && ac.value;
		}
	}
	return correct;
}
com.wiris.quizzes.QuestionInstance.prototype.getMatchingChecks = function(correctAnswer,userAnswer) {
	var result = new Array();
	var checks = this.checks.get(userAnswer + "");
	var i;
	var _g1 = 0, _g = checks.length;
	while(_g1 < _g) {
		var i1 = _g1++;
		if(checks[i1].correctAnswer == correctAnswer) result.push(checks[i1]);
	}
	return result;
}
com.wiris.quizzes.QuestionInstance.prototype.getAnswerFeedback = function(q,answer,lang,correct,incorrect,syntax,equivalent,check) {
	var checks = this.checks.get(answer + "");
	var h = new com.wiris.quizzes.HTMLGui(lang);
	var ass = new Array();
	var i;
	var _g1 = 0, _g = checks.length;
	while(_g1 < _g) {
		var i1 = _g1++;
		var c = checks[i1];
		if(correct && c.value || incorrect && !c.value) {
			if(syntax && StringTools.startsWith(c.assertion,"syntax_") || equivalent && StringTools.startsWith(c.assertion,"equivalent_") || check && StringTools.startsWith(c.assertion,"check_")) ass.push(c);
		}
	}
	var html = h.getAssertionFeedback(q,ass);
	return html;
}
com.wiris.quizzes.QuestionInstance.prototype.checksToHash = function(a,h) {
	if(a == null) return null;
	if(h == null) h = new Hash();
	var i;
	var _g1 = 0, _g = a.length;
	while(_g1 < _g) {
		var i1 = _g1++;
		var c = a[i1];
		if(!h.exists("" + c.answer)) h.set("" + c.answer,new Array());
		var answerChecks = h.get("" + c.answer);
		var found = false;
		var j;
		var _g3 = 0, _g2 = answerChecks.length;
		while(_g3 < _g2) {
			var j1 = _g3++;
			if(answerChecks[j1].assertion == c.assertion && answerChecks[j1].correctAnswer == c.correctAnswer) {
				answerChecks[j1] = c;
				found = true;
			}
		}
		if(!found) answerChecks.push(c);
	}
	return h;
}
com.wiris.quizzes.QuestionInstance.prototype.hashToChecks = function(h,a) {
	if(h == null) return null;
	if(a == null) a = new Array();
	var answers = h.keys();
	while(answers.hasNext()) {
		var answer = answers.next();
		a.concat(h.get(answer));
	}
	return a;
}
com.wiris.quizzes.QuestionInstance.prototype.variablesToHash = function(a,h) {
	if(a == null) return null;
	if(h == null) h = new Hash();
	var i;
	var _g1 = 0, _g = a.length;
	while(_g1 < _g) {
		var i1 = _g1++;
		var v = a[i1];
		if(!h.exists(v.type)) h.set(v.type,new Hash());
		h.get(v.type).set(v.name,v.content);
	}
	return h;
}
com.wiris.quizzes.QuestionInstance.prototype.hashToVariables = function(h,a) {
	if(h == null) return null;
	if(a == null) a = new Array();
	var t = h.keys();
	while(t.hasNext()) {
		var type = t.next();
		var vars = h.get(type);
		var names = vars.keys();
		while(names.hasNext()) {
			var name = names.next();
			var v = new com.wiris.quizzes.Variable();
			v.type = type;
			v.name = name;
			v.content = vars.get(name);
			a.push(v);
		}
	}
	return a;
}
com.wiris.quizzes.QuestionInstance.prototype.__class__ = com.wiris.quizzes.QuestionInstance;
com.wiris.quizzes.QuestionResponse = function(p) {
	if( p === $_ ) return;
	com.wiris.quizzes.Serializable.call(this);
}
com.wiris.quizzes.QuestionResponse.__name__ = ["com","wiris","quizzes","QuestionResponse"];
com.wiris.quizzes.QuestionResponse.__super__ = com.wiris.quizzes.Serializable;
for(var k in com.wiris.quizzes.Serializable.prototype ) com.wiris.quizzes.QuestionResponse.prototype[k] = com.wiris.quizzes.Serializable.prototype[k];
com.wiris.quizzes.QuestionResponse.prototype.results = null;
com.wiris.quizzes.QuestionResponse.prototype.onSerialize = function(s) {
	s.beginTag(com.wiris.quizzes.QuestionResponse.tagName);
	this.results = s.serializeArray(this.results,null);
	s.endTag();
}
com.wiris.quizzes.QuestionResponse.prototype.newInstance = function() {
	return new com.wiris.quizzes.QuestionResponse();
}
com.wiris.quizzes.QuestionResponse.prototype.__class__ = com.wiris.quizzes.QuestionResponse;
haxe.BaseCode = function(base) {
	if( base === $_ ) return;
	var len = base.length;
	var nbits = 1;
	while(len > 1 << nbits) nbits++;
	if(nbits > 8 || len != 1 << nbits) throw "BaseCode : base length must be a power of two.";
	this.base = base;
	this.nbits = nbits;
}
haxe.BaseCode.__name__ = ["haxe","BaseCode"];
haxe.BaseCode.encode = function(s,base) {
	var b = new haxe.BaseCode(haxe.io.Bytes.ofString(base));
	return b.encodeString(s);
}
haxe.BaseCode.decode = function(s,base) {
	var b = new haxe.BaseCode(haxe.io.Bytes.ofString(base));
	return b.decodeString(s);
}
haxe.BaseCode.prototype.base = null;
haxe.BaseCode.prototype.nbits = null;
haxe.BaseCode.prototype.tbl = null;
haxe.BaseCode.prototype.encodeBytes = function(b) {
	var nbits = this.nbits;
	var base = this.base;
	var size = Std["int"](b.length * 8 / nbits);
	var out = haxe.io.Bytes.alloc(size + (b.length * 8 % nbits == 0?0:1));
	var buf = 0;
	var curbits = 0;
	var mask = (1 << nbits) - 1;
	var pin = 0;
	var pout = 0;
	while(pout < size) {
		while(curbits < nbits) {
			curbits += 8;
			buf <<= 8;
			buf |= b.b[pin++];
		}
		curbits -= nbits;
		out.b[pout++] = base.b[buf >> curbits & mask] & 255;
	}
	if(curbits > 0) out.b[pout++] = base.b[buf << nbits - curbits & mask] & 255;
	return out;
}
haxe.BaseCode.prototype.initTable = function() {
	var tbl = new Array();
	var _g = 0;
	while(_g < 256) {
		var i = _g++;
		tbl[i] = -1;
	}
	var _g1 = 0, _g = this.base.length;
	while(_g1 < _g) {
		var i = _g1++;
		tbl[this.base.b[i]] = i;
	}
	this.tbl = tbl;
}
haxe.BaseCode.prototype.decodeBytes = function(b) {
	var nbits = this.nbits;
	var base = this.base;
	if(this.tbl == null) this.initTable();
	var tbl = this.tbl;
	var size = b.length * nbits >> 3;
	var out = haxe.io.Bytes.alloc(size);
	var buf = 0;
	var curbits = 0;
	var pin = 0;
	var pout = 0;
	while(pout < size) {
		while(curbits < 8) {
			curbits += nbits;
			buf <<= nbits;
			var i = tbl[b.b[pin++]];
			if(i == -1) throw "BaseCode : invalid encoded char";
			buf |= i;
		}
		curbits -= 8;
		out.b[pout++] = buf >> curbits & 255 & 255;
	}
	return out;
}
haxe.BaseCode.prototype.encodeString = function(s) {
	return this.encodeBytes(haxe.io.Bytes.ofString(s)).toString();
}
haxe.BaseCode.prototype.decodeString = function(s) {
	return this.decodeBytes(haxe.io.Bytes.ofString(s)).toString();
}
haxe.BaseCode.prototype.__class__ = haxe.BaseCode;
com.wiris.quizzes.MultipleQuestionResponse = function(p) {
	if( p === $_ ) return;
	com.wiris.quizzes.Serializable.call(this);
}
com.wiris.quizzes.MultipleQuestionResponse.__name__ = ["com","wiris","quizzes","MultipleQuestionResponse"];
com.wiris.quizzes.MultipleQuestionResponse.__super__ = com.wiris.quizzes.Serializable;
for(var k in com.wiris.quizzes.Serializable.prototype ) com.wiris.quizzes.MultipleQuestionResponse.prototype[k] = com.wiris.quizzes.Serializable.prototype[k];
com.wiris.quizzes.MultipleQuestionResponse.prototype.questionResponses = null;
com.wiris.quizzes.MultipleQuestionResponse.prototype.onSerialize = function(s) {
	s.beginTag(com.wiris.quizzes.MultipleQuestionResponse.tagName);
	this.questionResponses = s.serializeArray(this.questionResponses,null);
	s.endTag();
}
com.wiris.quizzes.MultipleQuestionResponse.prototype.newInstance = function() {
	return new com.wiris.quizzes.MultipleQuestionResponse();
}
com.wiris.quizzes.MultipleQuestionResponse.prototype.__class__ = com.wiris.quizzes.MultipleQuestionResponse;
haxe.io.Eof = function(p) {
}
haxe.io.Eof.__name__ = ["haxe","io","Eof"];
haxe.io.Eof.prototype.toString = function() {
	return "Eof";
}
haxe.io.Eof.prototype.__class__ = haxe.io.Eof;
com.wiris.quizzes.HTMLGui = function(lang) {
	if( lang === $_ ) return;
	this.lang = lang != null?lang:"en";
	this.t = com.wiris.quizzes.Translator.getInstance(this.lang);
}
com.wiris.quizzes.HTMLGui.__name__ = ["com","wiris","quizzes","HTMLGui"];
com.wiris.quizzes.HTMLGui.getNewId = function() {
	return com.wiris.quizzes.HTMLGui.id++;
}
com.wiris.quizzes.HTMLGui.prototype.t = null;
com.wiris.quizzes.HTMLGui.prototype.lang = null;
com.wiris.quizzes.HTMLGui.prototype.getCorrectAnswerInput = function(q,qi,correctAnswer,inPopup,classes) {
	var conf = new com.wiris.quizzes.HTMLGuiConfig(classes);
	var h = new com.wiris.quizzes.HTML();
	if(q == null) q = new com.wiris.quizzes.Question();
	if(q.correctAnswers == null) q.correctAnswers = new Array();
	var a = null;
	if(q.correctAnswers.length > correctAnswer) a = q.correctAnswers[correctAnswer];
	if(a == null) {
		a = new com.wiris.quizzes.CorrectAnswer();
		a.id = correctAnswer;
		a.type = com.wiris.quizzes.MathContent.TYPE_MATHML;
		a.content = "";
	}
	var unique = com.wiris.quizzes.HTMLGui.getNewId();
	if(!inPopup) {
		this.printWirisTextfield(h,"wiriscorrectanswer",correctAnswer,a.content,unique,conf);
		this.printAssertionsSummary(h,q,a,unique,conf);
	} else {
		this.printTabs(h,q,qi,correctAnswer,this.lang,unique,conf);
		this.printSubmitButtons(h,unique + "[" + correctAnswer + "]");
	}
	return h.getString();
}
com.wiris.quizzes.HTMLGui.prototype.openVerticalTabs = function(h,menu,unique) {
	h.openDivClass("wiristabs" + unique,"wiristabs");
	h.openDivClass(null,"wiristabsleftcolumn");
	h.openDivClass(null,"wiristablistwrapper");
	h.openUl("wiristablist" + unique,"wiristablist");
	var i;
	var _g1 = 0, _g = menu.length;
	while(_g1 < _g) {
		var i1 = _g1++;
		h.open("li",[["class","wiristab " + menu[i1][2]]]);
		h.openA("wiristablink" + unique + "[" + menu[i1][0] + "]",null,"wiristablink");
		h.text(menu[i1][1]);
		h.close();
		h.close();
	}
	h.close();
	h.close();
	h.openDivClass(null,"wirishelpwrapper");
	var _g1 = 0, _g = menu.length;
	while(_g1 < _g) {
		var i1 = _g1++;
		h.openDivClass("wiristabhelp" + unique + "[" + menu[i1][0] + "]","wiristabhelp");
		h.formatText(menu[i1][3]);
		h.close();
	}
	h.close();
	h.close();
}
com.wiris.quizzes.HTMLGui.prototype.printTabs = function(h,q,qi,correctAnswer,lang,unique,conf) {
	var menu = new Array();
	if(conf.tabCorrectAnswer) menu.push(["wiriscorrectanswertab" + unique,this.t.t("correctanswer"),"wiriscorrectanswertab",this.t.t("correctanswertabhelp")]);
	if(conf.tabValidation) menu.push(["wirisassertionstab" + unique,this.t.t("validation"),"wirisassertionstab",this.t.t("assertionstabhelp")]);
	if(conf.tabVariables) menu.push(["wirisvariablestab" + unique,this.t.t("variables"),"wirisvariablestab",this.t.t("variablestabhelp")]);
	if(conf.tabPreview) menu.push(["wiristesttab" + unique,this.t.t("preview"),"wiristesttab",this.t.t("testtabhelp")]);
	this.openVerticalTabs(h,menu,unique);
	h.openDivClass("wiristabcontentwrapper" + unique,"wiristabcontentwrapper");
	var tabid = "wiristabcontent" + unique;
	var tabclass = "wiristabcontent wirishidden";
	var tabcount = 0;
	if(conf.tabCorrectAnswer) {
		h.openDivClass(tabid + "[" + menu[tabcount][0] + "]",tabclass);
		h.openDivClass("wiriseditorwrapper" + unique,"wiriseditorwrapper");
		this.printWirisEditor(h,lang,"wiriscorrectanswer" + unique + "[" + correctAnswer + "]","",unique);
		h.close();
		this.printLocalData(h,q,unique);
		h.close();
		tabcount++;
	}
	if(conf.tabValidation) {
		h.openDivClass(tabid + "[" + menu[tabcount][0] + "]",tabclass);
		this.printInputControls(h,q,correctAnswer,unique);
		this.printAssertionsControls(h,q,correctAnswer,unique);
		h.close();
		tabcount++;
	}
	if(conf.tabVariables) {
		h.openDivClass(tabid + "[" + menu[tabcount][0] + "]",tabclass);
		this.printWirisCas(h,q.wirisCasSession,unique);
		h.openDivClass("wiriscasbottomwrapper" + unique,"wiriscasbottomwrapper");
		this.printOutputControls(h,unique);
		h.close();
		h.close();
		tabcount++;
	}
	if(conf.tabPreview) {
		h.openDivClass(tabid + "[" + menu[tabcount][0] + "]",tabclass);
		this.printTester(h,q,qi,correctAnswer,unique);
		h.close();
		tabcount++;
	}
	h.close();
	h.close();
}
com.wiris.quizzes.HTMLGui.prototype.getUserAnswerInput = function(q,qi,answer,inPopup,classes) {
	var conf = new com.wiris.quizzes.HTMLGuiConfig(classes);
	var h = new com.wiris.quizzes.HTML();
	var content;
	if(qi != null && qi.userData != null && qi.userData.answers != null && answer < qi.userData.answers.length) content = qi.userData.answers[answer].content; else content = "";
	var unique = com.wiris.quizzes.HTMLGui.getNewId();
	var input = q.getLocalData(com.wiris.quizzes.LocalData.KEY_OPENANSWER_INPUT_FIELD);
	if(inPopup || input == com.wiris.quizzes.LocalData.VALUE_OPENANSWER_INPUT_FIELD_INLINE_EDITOR) this.printWirisEditor(h,this.lang,"wirisanswer" + unique + "[" + answer + "]",content,unique); else if(input == com.wiris.quizzes.LocalData.VALUE_OPENANSWER_INPUT_FIELD_POPUP_EDITOR) this.printWirisTextfield(h,"wirisanswer",answer,content,unique,conf); else h.input("text","wirisanswer" + unique + "[" + answer + "]",null,content,null,"wirisplaintextinput");
	if(inPopup) this.printSubmitButtons(h,unique + "[" + answer + "]");
	return h.getString();
}
com.wiris.quizzes.HTMLGui.prototype.printSubmitButtons = function(h,suffix) {
	h.openDivClass("wirissubmitbuttons" + suffix,"wirissubmitbuttons");
	h.openDivClass("wirissubmitbuttonswrapper" + suffix,"wirissubmitbuttonswrapper");
	h.input("button","wirisacceptbutton" + suffix,"",this.t.t("accept"),null,"wirissubmitbutton wirisbutton");
	h.input("button","wiriscancelbutton" + suffix,"",this.t.t("cancel"),null,"wiriscancelbutton wirisbutton");
	h.close();
	h.close();
}
com.wiris.quizzes.HTMLGui.prototype.getAssertionFeedback = function(q,a) {
	var h = new com.wiris.quizzes.HTML();
	h.openUl(null,"wirisfeedbacklist");
	var i;
	var _g1 = 0, _g = a.length;
	while(_g1 < _g) {
		var i1 = _g1++;
		var c = a[i1];
		h.openLi();
		var className = c.value?"wiriscorrect":"wirisincorrect";
		var suffix = c.value?"_correct_feedback":"_incorrect_feedback";
		h.openSpan(null,className);
		var text = this.t.t(c.assertion + suffix);
		if(q != null && q.assertions != null) {
			var index = q.getAssertionIndex(c.assertion,c.correctAnswer,c.answer);
			if(index != -1) {
				var ass = q.assertions[index];
				if(ass.parameters != null) {
					var j;
					var _g3 = 0, _g2 = ass.parameters.length;
					while(_g3 < _g2) {
						var j1 = _g3++;
						var p = ass.parameters[j1];
						text = StringTools.replace(text,"${" + p.name + "}",p.content);
					}
				}
			}
		}
		h.text(text);
		h.close();
		h.close();
	}
	h.close();
	return h.getString();
}
com.wiris.quizzes.HTMLGui.prototype.syntaxCheckbox = function(h,id,value,label,all) {
	var className = all?"wirisassertionparamall":null;
	h.openSpan(null,"wirishorizontalparam");
	h.input("checkbox",id,null,value,value,className);
	h.label(label,id,null);
	h.close();
}
com.wiris.quizzes.HTMLGui.prototype.printInputControls = function(h,q,correctAnswer,unique) {
	var id;
	h.openDiv("wirisinputcontrols" + unique);
	h.openFieldset("wirisinputcontrolsfieldset" + unique,this.t.t("allowedinput"),"wirismainfieldset");
	h.help("wirisinputcontrolshelp" + unique,com.wiris.quizzes.QuizzesConfig.QUIZZES_SERVICE_URL + "/assertions.xml?type=syntax",this.t.t("manual"));
	h.openDivClass("wirissyntaxassertions" + unique,"wirissyntaxassertions");
	h.openUl("wirisinputcontrolslist" + unique,"wirisinputcontrolslist");
	var i;
	var _g1 = 0, _g = com.wiris.quizzes.Assertion.syntactic.length;
	while(_g1 < _g) {
		var i1 = _g1++;
		if(com.wiris.quizzes.Assertion.syntactic[i1] == com.wiris.quizzes.Assertion.SYNTAX_LIST) continue;
		h.openLi();
		id = "wirisassertion" + unique + "[" + com.wiris.quizzes.Assertion.syntactic[i1] + "][" + correctAnswer + "][0]";
		h.input("radio",id,"wirisradiosyntax" + unique,null,null,null);
		h.openStrong();
		h.label(this.t.t(com.wiris.quizzes.Assertion.syntactic[i1]),id,null);
		h.close();
		h.text(" ");
		h.label(this.t.t(com.wiris.quizzes.Assertion.syntactic[i1] + "_description"),id,null);
		h.close();
	}
	h.close();
	h.openFieldset("wirissyntaxparams" + unique,this.t.t("syntaxparams"),"wirissyntaxparams");
	h.openDivClass("wirissyntaxconstants" + unique,"wirissyntaxparam");
	h.openSpan("wirissyntaxconstantslabel" + unique,"wirissyntaxlabel");
	h.text(this.t.t("constants"));
	h.close();
	id = "wirisassertionparampart" + unique + "[syntax_expression, syntax_quantity, syntax_list][constants][" + correctAnswer + "][0]";
	var letterpi = String.fromCharCode(960);
	this.syntaxCheckbox(h,id + "[0]",letterpi,letterpi,false);
	this.syntaxCheckbox(h,id + "[1]","e","e",false);
	this.syntaxCheckbox(h,id + "[2]","i","i",false);
	this.syntaxCheckbox(h,id + "[3]","j","j",false);
	h.close();
	h.openDivClass("wirissyntaxfunctions" + unique,"wirissyntaxparam");
	h.openDiv("wirissyntaxfunctionscheckboxes" + unique);
	h.openSpan("wirissyntaxfunctionlabel" + unique,"wirissyntaxlabel");
	h.text(this.t.t("functions"));
	h.close();
	id = "wirisassertionparampart" + unique + "[syntax_expression, syntax_list][functions][" + correctAnswer + "][0]";
	this.syntaxCheckbox(h,id + "[0]","exp, log, ln",this.t.t("explog"),false);
	this.syntaxCheckbox(h,id + "[1]","sin, cos, tan, asin, acos, atan, cosec, sec, cotan, acosec, asec, acotan",this.t.t("trigonometric"),false);
	this.syntaxCheckbox(h,id + "[2]","sinh, cosh, tanh, asinh, acosh, atanh",this.t.t("hyperbolic"),false);
	this.syntaxCheckbox(h,id + "[3]","min, max, sign",this.t.t("arithmetic"),false);
	h.close();
	h.openDiv("wirissyntaxfunctionscustom" + unique);
	h.openSpan("wirissyntaxuserfunctionlabel" + unique,"wirissyntaxlabel");
	h.label(this.t.t("userfunctions"),id + "[4]",null);
	h.close();
	h.input("text",id + "[4]","",null,null,"wirisuserfunctions");
	h.close();
	h.close();
	h.openDivClass("wirissyntaxunits" + unique,"wirissyntaxparam");
	h.openSpan("wirissyntaxunitslabel" + unique,"wirissyntaxlabel");
	h.text(this.t.t("units"));
	h.close();
	id = "wirisassertionparampart" + unique + "[syntax_quantity][units][" + correctAnswer + "][0]";
	this.syntaxCheckbox(h,id + "[0]","m","m",false);
	this.syntaxCheckbox(h,id + "[1]","s","s",false);
	this.syntaxCheckbox(h,id + "[2]","g","g",false);
	this.syntaxCheckbox(h,id + "[3]","sr, m, g, s, E, K, mol, cd, rad, h, min, l, N, Pa, Hz, W,J, C, V, " + String.fromCharCode(937) + ", F, S, Wb, b, H, T, lx, lm, Gy, Bq, Sv, kat",this.t.t("all"),true);
	h.close();
	h.openDivClass("wirissyntaxunitprefixes" + unique,"wirissyntaxparam");
	h.openSpan("wirissyntaxunitslabel" + unique,"wirissyntaxlabel");
	h.text(this.t.t("unitprefixes"));
	h.close();
	id = "wirisassertionparampart" + unique + "[syntax_quantity][unitprefixes][" + correctAnswer + "][0]";
	this.syntaxCheckbox(h,id + "[0]","M","M",false);
	this.syntaxCheckbox(h,id + "[1]","k","k",false);
	this.syntaxCheckbox(h,id + "[2]","c","c",false);
	this.syntaxCheckbox(h,id + "[3]","m","m",false);
	this.syntaxCheckbox(h,id + "[4]","y, z, a, f, p, n, " + String.fromCharCode(181) + ", m, c, d, da, h, k, M, G, T, P, E, Z, Y",this.t.t("all"),true);
	h.close();
	h.openDivClass("wirissyntaxmixedfractions" + unique,"wirissyntaxparam");
	id = "wirisassertionparam" + unique + "[syntax_quantity][mixedfractions][" + correctAnswer + "][0]";
	h.openSpan("wirissyntaxmixedfractionslabel" + unique,"wirissyntaxlabel");
	h.label(this.t.t("mixedfractions") + ":",id,null);
	h.close();
	h.input("checkbox",id,"","true",null,null);
	h.close();
	h.close();
	h.close();
	h.openDiv("wiristolerance" + unique);
	var idtol = "wirisoption" + unique + "[" + com.wiris.quizzes.Option.OPTION_TOLERANCE + "]";
	h.label(this.t.t("tolerancedigits"),idtol,"wirisleftlabel2");
	h.text(" ");
	h.input("text",idtol,"",null,null,null);
	var idRelTol = "wirisoption" + unique + "[" + com.wiris.quizzes.Option.OPTION_RELATIVE_TOLERANCE + "]";
	h.input("checkbox",idRelTol,"",null,null,null);
	h.label(this.t.t("relative"),idRelTol,null);
	h.close();
	h.close();
	h.close();
}
com.wiris.quizzes.HTMLGui.prototype.getWirisCasLanguages = function() {
	var langs = [["ca",this.t.t("Catalan")],["en",this.t.t("English")],["es",this.t.t("Spanish")],["et",this.t.t("Estonian")],["eu",this.t.t("Basque")],["fr",this.t.t("French")],["de",this.t.t("German")],["it",this.t.t("Italian")],["nl",this.t.t("Dutch")],["pt",this.t.t("Portuguese")]];
	return langs;
}
com.wiris.quizzes.HTMLGui.prototype.printOutputControls = function(h,unique) {
	h.openDivClass("wirisalgorithmlanguagediv" + unique,"wirisalgorithmlanguage");
	h.label(this.t.t("algorithmlanguage"),"wirislagorithmlanguage",null);
	h.text(" ");
	var langs = this.getWirisCasLanguages();
	h.select("wirisalgorithmlanguage" + unique,null,langs);
	h.close();
	h.openDiv("wirisoutputcontrols" + unique);
	h.openFieldset("wirisoutputcontrolsfieldset" + unique,this.t.t("Output options"),"wirismainfieldset");
	h.help("wirisoutputcontrolshelp" + unique,com.wiris.quizzes.QuizzesConfig.QUIZZES_SERVICE_URL + "/assertions.xml",this.t.t("manual"));
	h.openUl("wirisoutputcontrolslist" + unique,"wirisoutputcontrolslist");
	var id;
	h.openLi();
	id = "wirisoption" + unique + "[" + com.wiris.quizzes.Option.OPTION_PRECISION + "]";
	h.label(this.t.t(com.wiris.quizzes.Option.OPTION_PRECISION),id,"wirisleftlabel");
	h.input("text",id,null,null,null,null);
	h.close();
	h.openLi();
	id = "wirisoption" + unique + "[" + com.wiris.quizzes.Option.OPTION_IMPLICIT_TIMES_OPERATOR + "]";
	h.label(this.t.t(com.wiris.quizzes.Option.OPTION_IMPLICIT_TIMES_OPERATOR),id,"wirisleftlabel");
	h.input("checkbox",id,null,"true",this.t.t(id),null);
	h.close();
	h.openLi();
	id = "wirisoptionpart" + unique + "[" + com.wiris.quizzes.Option.OPTION_TIMES_OPERATOR + "]";
	h.openSpan(null,"wirisleftlabel");
	h.text(this.t.t(com.wiris.quizzes.Option.OPTION_TIMES_OPERATOR));
	h.close();
	h.openSpan(null,"wirishorizontalparam");
	h.input("radio",id + "[0]",id,String.fromCharCode(183),String.fromCharCode(183),null);
	h.label("a" + String.fromCharCode(183) + "b",id + "[0]",null);
	h.close();
	h.openSpan(null,"wirishorizontalparam");
	h.input("radio",id + "[1]",id,String.fromCharCode(215),String.fromCharCode(215),null);
	h.label("a" + String.fromCharCode(215) + "b",id + "[1]",null);
	h.close();
	h.close();
	h.openLi();
	id = "wirisoptionpart" + unique + "[" + com.wiris.quizzes.Option.OPTION_IMAGINARY_UNIT + "]";
	h.openSpan(null,"wirisleftlabel");
	h.text(this.t.t(com.wiris.quizzes.Option.OPTION_IMAGINARY_UNIT));
	h.close();
	h.openSpan(null,"wirishorizontalparam");
	h.input("radio",id + "[0]",id,"i","i",null);
	h.label("i",id + "[0]",null);
	h.close();
	h.openSpan(null,"wirishorizontalparam");
	h.input("radio",id + "[1]",id,"j","j",null);
	h.label("j",id + "[1]",null);
	h.close();
	h.close();
	h.close();
	h.close();
	h.close();
}
com.wiris.quizzes.HTMLGui.prototype.printWirisCas = function(h,session,unique) {
	h.openDivClass("wiriscaswrapper" + unique,"wiriscaswrapper");
	var caslang = session != null?this.getLangFromCasSession(session):this.lang;
	h.raw(this.getWirisCasApplet("wiriscas" + unique,caslang));
	h.close();
}
com.wiris.quizzes.HTMLGui.prototype.getWirisCasApplet = function(id,lang) {
	var h = new com.wiris.quizzes.HTML();
	h.open("applet",[["id",id],["name","wiriscas"],["codebase",com.wiris.quizzes.QuizzesConfig.WIRIS_SERVICE_URL + "/wiris-codebase"],["code","WirisApplet_net_" + lang],["archive","wrs_net_" + lang + ".jar"],["height","100%"],["width","100%"]]);
	h.openclose("param",[["name","command"],["value","false"]]);
	h.openclose("param",[["name","commands"],["value","false"]]);
	h.openclose("param",[["name","interface"],["value","false"]]);
	h.close();
	return h.getString();
}
com.wiris.quizzes.HTMLGui.prototype.getAssertionString = function(a,chars) {
	var sb = new StringBuf();
	sb.add(this.t.t(a.name));
	if(a.parameters != null && a.parameters.length > 0) {
		var i;
		var _g1 = 0, _g = a.parameters.length;
		while(_g1 < _g) {
			var i1 = _g1++;
			sb.b[sb.b.length] = " " == null?"null":" ";
			sb.add(a.parameters[i1].content);
		}
	}
	var res = sb.b.join("");
	if(res.length > chars) res = res.substr(0,chars - 3) + "...";
	return res;
}
com.wiris.quizzes.HTMLGui.prototype.printAssertionsSummary = function(h,q,ca,unique,conf) {
	var syntax = null;
	var equivalent = null;
	var properties = new Array();
	if(q.assertions != null) {
		var i;
		var _g1 = 0, _g = q.assertions.length;
		while(_g1 < _g) {
			var i1 = _g1++;
			var a = q.assertions[i1];
			if(ca.id == a.correctAnswer) {
				var text = this.getAssertionString(a,40);
				if(StringTools.startsWith(a.name,"syntax_")) syntax = text; else if(StringTools.startsWith(a.name,"equivalent_")) equivalent = text; else properties.push(text);
			}
		}
	}
	h.openDiv("assertionssummarydiv" + unique);
	h.openUl("assertionssummary" + unique,"assertionssummary");
	if(syntax != null) {
		h.openLi();
		h.text(this.t.t("allowedinput"));
		h.text(": ");
		h.textEm(syntax);
		h.close();
	}
	if(equivalent != null) {
		h.openLi();
		h.text(this.t.t("comparison"));
		h.text(": ");
		h.textEm(equivalent);
		h.close();
	}
	if(properties.length > 0) {
		h.openLi();
		h.text(this.t.t("properties"));
		h.text(":");
		h.openUl("assertionsummarychecks" + unique,"assertionsummarychecks");
		var i;
		var _g1 = 0, _g = properties.length;
		while(_g1 < _g) {
			var i1 = _g1++;
			h.openLi();
			h.textEm(properties[i1]);
			h.close();
		}
		h.close();
		h.close();
	}
	if(q.wirisCasSession != null && q.wirisCasSession.length > 0) {
		h.openLi();
		h.text(this.t.t("hasalgorithm"));
		h.close();
	}
	h.close();
	h.close();
}
com.wiris.quizzes.HTMLGui.prototype.printAssertionsControls = function(h,q,correctAnswer,unique) {
	h.openDiv("wirisassertioncontrols" + unique);
	h.openFieldset("wiriscomparisonfieldset" + unique + "[" + correctAnswer + "][0]",this.t.t("comparisonwithstudentanswer"),"wirismainfieldset");
	h.help("wiriscomparisonhelp" + unique,com.wiris.quizzes.QuizzesConfig.QUIZZES_SERVICE_URL + "/assertions.xml?type=equivalent",this.t.t("manual"));
	h.openUl("wiriscomparison" + unique + "[" + correctAnswer + "][0]","wirisul");
	var i;
	var idassertion;
	var _g1 = 0, _g = com.wiris.quizzes.Assertion.equivalent.length;
	while(_g1 < _g) {
		var i1 = _g1++;
		h.openLi();
		idassertion = "wirisassertion" + unique + "[" + com.wiris.quizzes.Assertion.equivalent[i1] + "][" + correctAnswer + "][0]";
		h.input("radio",idassertion,"wirisradiocomparison" + unique + "[" + correctAnswer + "][0]",null,null,null);
		h.label(this.t.t(com.wiris.quizzes.Assertion.equivalent[i1]),idassertion,null);
		if(com.wiris.quizzes.Assertion.equivalent[i1] == com.wiris.quizzes.Assertion.EQUIVALENT_FUNCTION) {
			h.text(" ");
			h.input("text","wirisassertionparam" + unique + "[" + com.wiris.quizzes.Assertion.EQUIVALENT_FUNCTION + "][name][" + correctAnswer + "][0]","","",null,null);
		}
		h.close();
	}
	h.close();
	h.close();
	h.openFieldset("wirisadditionalchecksfieldset" + unique + "[" + correctAnswer + "][0]",this.t.t("additionalproperties"),"wirismainfieldset");
	h.help("wirisadditionalcheckshelp" + unique,com.wiris.quizzes.QuizzesConfig.QUIZZES_SERVICE_URL + "/assertions.xml?type=check",this.t.t("manual"));
	h.openDivClass("wirisstructurediv" + unique + "[" + correctAnswer + "][0]","wirissecondaryfieldset");
	h.openDivClass("wirisstructuredivlegend" + unique + "[" + correctAnswer + "][0]","wirissecondaryfieldsetlegend");
	h.text(this.t.t("structure:"));
	h.close();
	var options = new Array();
	options[0] = new Array();
	options[0][0] = "";
	options[0][1] = this.t.t("none");
	var _g1 = 0, _g = com.wiris.quizzes.Assertion.structure.length;
	while(_g1 < _g) {
		var i1 = _g1++;
		options[i1 + 1] = new Array();
		options[i1 + 1][0] = com.wiris.quizzes.Assertion.structure[i1];
		options[i1 + 1][1] = this.t.t(com.wiris.quizzes.Assertion.structure[i1]);
	}
	h.select("wirisstructureselect" + unique + "[" + correctAnswer + "][0]","",options);
	h.close();
	h.openDivClass("wirismorediv" + unique + "[" + correctAnswer + "][0]","wirissecondaryfieldset");
	h.text(this.t.t("more:"));
	h.openUl("wirismore" + unique + "[" + correctAnswer + "][0]","wirisul");
	var _g1 = 0, _g = com.wiris.quizzes.Assertion.checks.length;
	while(_g1 < _g) {
		var i1 = _g1++;
		h.openLi();
		idassertion = "wirisassertion" + unique + "[" + com.wiris.quizzes.Assertion.checks[i1] + "][" + correctAnswer + "][0]";
		h.input("checkbox",idassertion,null,null,null,null);
		h.label(this.t.t(com.wiris.quizzes.Assertion.checks[i1]),idassertion,null);
		var parameters = com.wiris.quizzes.Assertion.getParameterNames(com.wiris.quizzes.Assertion.checks[i1]);
		if(parameters != null) {
			var j;
			var _g3 = 0, _g2 = parameters.length;
			while(_g3 < _g2) {
				var j1 = _g3++;
				h.text(" ");
				h.input("text","wirisassertionparam" + unique + "[" + com.wiris.quizzes.Assertion.checks[i1] + "][" + parameters[j1] + "][" + correctAnswer + "][0]",null,null,null,null);
			}
		}
		h.close();
	}
	h.close();
	h.close();
	h.close();
	h.close();
}
com.wiris.quizzes.HTMLGui.prototype.printTester = function(h,q,qi,correctAnswer,unique) {
	if(q == null) q = new com.wiris.quizzes.Question();
	if(qi == null) qi = new com.wiris.quizzes.QuestionInstance();
	var hasUserAnswer = qi.userData != null && qi.userData.answers != null && qi.userData.answers.length > 0;
	h.openDivClass("wiristestwrapper" + unique,"wiristestwrapper");
	h.openDivClass("wiristestanswer" + unique,"wiristestanswer wiriseditorwrapper");
	var content;
	if(hasUserAnswer) content = qi.userData.answers[0].content; else content = "";
	this.printWirisEditor(h,null,"wiristestanswer" + unique,content,unique);
	h.close();
	h.openDivClass("wiristestbuttons" + unique,"wiristestbuttons");
	h.input("button","wiristestbutton" + unique,null,this.t.t("test"),null,"wirisbutton");
	h.input("button","wirisrestartbutton" + unique,null,this.t.t("start"),null,"wirisbutton");
	h.close();
	h.openDivClass("wiristestdynamic" + unique,"wiristestdynamic");
	h.raw(this.getWirisTestDynamic(q,qi,correctAnswer,unique));
	h.close();
	h.close();
}
com.wiris.quizzes.HTMLGui.prototype.getWirisTestDynamic = function(q,qi,correctAnswer,unique) {
	var h = new com.wiris.quizzes.HTML();
	var hasCorrectAnswer = q.correctAnswers != null && correctAnswer < q.correctAnswers.length;
	h.openDivClass("wiristestresult" + unique,"wiristestresult");
	h.openFieldset("wiristestvalidationfieldset" + unique,this.t.t("validation"),"wirismainfieldset");
	if(qi.hasEvaluation()) {
		h.openDivClass("wiristestgrade" + unique,"wiristestgrade");
		if(qi.isAnswerMatching(correctAnswer,0)) {
			h.openSpan("wiristestgradetext" + unique,"wiristestgradetext wiriscorrect");
			h.text(this.t.t("correct"));
			h.close();
		} else {
			h.openSpan("wiristestgradetext" + unique,"wiristestgradetext wirisincorrect");
			h.text(this.t.t("incorrect"));
			h.close();
		}
		h.close();
		h.openDivClass("wiristestassertions" + unique,"wiristestassertions");
		h.openDivClass("wiristestassertionslistwrapper" + unique,"wiristestassertionslistwrapper");
		h.openUl("wiristestassertionslist" + unique,"wiristestassertionslist");
		var checks = qi.getMatchingChecks(correctAnswer,0);
		var j;
		var _g1 = 0, _g = checks.length;
		while(_g1 < _g) {
			var j1 = _g1++;
			h.openLi();
			this.printAssertionFeedback(h,checks[j1],q);
			h.close();
		}
		h.close();
		h.close();
		h.close();
	} else h.text(this.t.t("clicktesttoevaluate"));
	h.close();
	h.close();
	h.openDivClass("wiristestcorrectanswer" + unique + "[" + correctAnswer + "]","wiristestcorrectanswer");
	h.openFieldset("wiristestcorrectanswerfieldset" + unique,this.t.t("correctanswer"),"wirismainfieldset");
	if(hasCorrectAnswer) {
		var content = q.correctAnswers[correctAnswer].content;
		if(qi.hasVariables()) content = qi.expandVariables(content);
		if(com.wiris.quizzes.MathContent.getMathType(content) == com.wiris.quizzes.MathContent.TYPE_MATHML) this.printMathML(h,content); else h.text(content);
	}
	h.close();
	h.close();
	return h.getString();
}
com.wiris.quizzes.HTMLGui.prototype.printAssertionFeedback = function(h,c,q) {
	h.openSpan(null,c.value?"wiriscorrect":"wirisincorrect");
	var feedback = this.t.t(c.assertion + "_correct_feedback");
	var a = q.assertions[q.getAssertionIndex(c.assertion,c.correctAnswer,c.answer)];
	if(a.parameters != null) {
		var i;
		var _g1 = 0, _g = a.parameters.length;
		while(_g1 < _g) {
			var i1 = _g1++;
			var name = a.parameters[i1].name;
			var value = a.parameters[i1].content;
			feedback = StringTools.replace(feedback,"${" + name + "}",value);
		}
	}
	h.text(feedback);
	h.close();
}
com.wiris.quizzes.HTMLGui.prototype.printWirisEditor = function(h,lang,name,content,unique) {
	if(content != null && content.length > 0 && com.wiris.quizzes.MathContent.getMathType(content) == com.wiris.quizzes.MathContent.TYPE_TEXT) {
		var tools = new com.wiris.quizzes.HTMLTools();
		content = tools.textToMathML(content);
	}
	h.textarea(name,"",content,"wiriseditor",lang);
}
com.wiris.quizzes.HTMLGui.prototype.printWirisTextfield = function(h,id,index,content,unique,conf) {
	h.openSpan("wirismathinput" + unique + "[" + id + "][" + index + "]","wirismathinput");
	if(conf.tabCorrectAnswer) {
		if(com.wiris.quizzes.MathContent.isEmpty(content)) content = "";
		var tools = new com.wiris.quizzes.HTMLTools();
		if(com.wiris.quizzes.MathContent.getMathType(content) == com.wiris.quizzes.MathContent.TYPE_MATHML && tools.isTokensMathML(content)) content = tools.mathMLToText(content);
		if(content.length == 0 || com.wiris.quizzes.MathContent.getMathType(content) == com.wiris.quizzes.MathContent.TYPE_TEXT) h.input("text",id + unique + "[" + index + "]","",content,null,"wirismathtextinput " + conf.getClasses()); else {
			this.printMathML(h,content);
			h.input("hidden",id + unique + "[" + index + "]","",content,null,conf.getClasses());
		}
		h.text(" ");
	} else h.input("hidden",id + unique + "[" + index + "]","",content,null,conf.getClasses());
	h.openA("wirispopuplink" + unique + "[" + id + "][" + index + "]","#","wirispopuplink wirispopupeditanswer");
	h.image("wiriseditoricon" + unique,com.wiris.quizzes.QuizzesConfig.QUIZZES_RESOURCES_URL + "/editor.gif",this.t.t("edit"));
	h.close();
	h.close();
}
com.wiris.quizzes.HTMLGui.prototype.getLangFromCasSession = function(session) {
	var start = session.indexOf("<session");
	if(start == -1) return null;
	var end = session.indexOf(">",start + 1);
	start = session.indexOf("lang",start);
	if(start == -1 || start > end) return null;
	start = session.indexOf("\"",start) + 1;
	return session.substr(start,2);
}
com.wiris.quizzes.HTMLGui.prototype.printLocalData = function(h,q,unique) {
	h.openFieldset("wirislocaldatafieldset" + unique,this.t.t("inputmethod"),"wirismainfieldset");
	h.help("wirisinputmethodhelp" + unique,com.wiris.quizzes.QuizzesConfig.QUIZZES_SERVICE_URL + "/assertions.xml?type=syntax",this.t.t("manual"));
	var id;
	h.openDivClass("wirisinputfielddiv" + unique,"wirissecondaryfieldset");
	h.openUl("wirisinputfieldul","wirisul");
	id = "wirislocaldata" + unique + "[" + com.wiris.quizzes.LocalData.KEY_OPENANSWER_INPUT_FIELD + "]";
	h.openLi();
	h.input("radio",id + "[0]",id,com.wiris.quizzes.LocalData.VALUE_OPENANSWER_INPUT_FIELD_INLINE_EDITOR,null,null);
	h.label(this.t.t("answerinputinlineeditor"),id + "[0]",null);
	h.close();
	h.openLi();
	h.input("radio",id + "[1]",id,com.wiris.quizzes.LocalData.VALUE_OPENANSWER_INPUT_FIELD_POPUP_EDITOR,null,null);
	h.label(this.t.t("answerinputpopupeditor"),id + "[1]",null);
	h.close();
	h.openLi();
	h.input("radio",id + "[2]",id,com.wiris.quizzes.LocalData.VALUE_OPENANSWER_INPUT_FIELD_PLAIN_TEXT,null,null);
	h.label(this.t.t("answerinputplaintext"),id + "[2]",null);
	h.close();
	h.close();
	h.close();
	h.close();
}
com.wiris.quizzes.HTMLGui.prototype.printEditCasInitialContent = function(q) {
	var h = new com.wiris.quizzes.HTML();
	h.openDivClass("wiriscontentwrapper","wiriscasinitialcontent");
	var session = q.getLocalData(com.wiris.quizzes.LocalData.KEY_CAS_INITIAL_SESSION);
	this.printWirisCas(h,session,com.wiris.quizzes.HTMLGui.getNewId());
	h.close();
	this.printSubmitButtons(h,"");
	return h.getString();
}
com.wiris.quizzes.HTMLGui.prototype.printMathML = function(h,mathml) {
	h.open("span",[["class","mathml"]]);
	var safeMathML = this.encodeUnicodeChars(mathml);
	var src = com.wiris.quizzes.QuizzesConfig.QUIZZES_PROXY_URL + "?service=render&mml=" + StringTools.urlEncode(safeMathML);
	h.openclose("img",[["src",src],["align","middle"]]);
	h.close();
}
com.wiris.quizzes.HTMLGui.prototype.encodeUnicodeChars = function(mathml) {
	var sb = new StringBuf();
	var i;
	var _g1 = 0, _g = mathml.length;
	while(_g1 < _g) {
		var i1 = _g1++;
		var c = mathml.charCodeAt(i1);
		if(c > 127) {
			sb.b[sb.b.length] = "&#" == null?"null":"&#";
			sb.b[sb.b.length] = c == null?"null":c;
			sb.b[sb.b.length] = ";" == null?"null":";";
		} else sb.b[sb.b.length] = String.fromCharCode(c);
	}
	return sb.b.join("");
}
com.wiris.quizzes.HTMLGui.prototype.__class__ = com.wiris.quizzes.HTMLGui;
com.wiris.quizzes.Assertion = function(p) {
	if( p === $_ ) return;
	com.wiris.quizzes.Serializable.call(this);
}
com.wiris.quizzes.Assertion.__name__ = ["com","wiris","quizzes","Assertion"];
com.wiris.quizzes.Assertion.__super__ = com.wiris.quizzes.Serializable;
for(var k in com.wiris.quizzes.Serializable.prototype ) com.wiris.quizzes.Assertion.prototype[k] = com.wiris.quizzes.Serializable.prototype[k];
com.wiris.quizzes.Assertion.paramdefault = null;
com.wiris.quizzes.Assertion.paramnames = null;
com.wiris.quizzes.Assertion.initParams = function() {
	com.wiris.quizzes.Assertion.paramnames = new Hash();
	com.wiris.quizzes.Assertion.paramnames.set("syntax_expression",["constants","functions"]);
	com.wiris.quizzes.Assertion.paramnames.set("syntax_list",["constants","functions"]);
	com.wiris.quizzes.Assertion.paramnames.set("syntax_quantity",["constants","units","unitprefixes","mixedfractions"]);
	com.wiris.quizzes.Assertion.paramnames.set("check_divisible",["value"]);
	com.wiris.quizzes.Assertion.paramnames.set("check_unit",["unit"]);
	com.wiris.quizzes.Assertion.paramnames.set("check_unit_literal",["unit"]);
	com.wiris.quizzes.Assertion.paramnames.set("check_no_more_decimals",["digits"]);
	com.wiris.quizzes.Assertion.paramnames.set("check_no_more_digits",["digits"]);
	com.wiris.quizzes.Assertion.paramnames.set("equivalent_function",["name"]);
	var paramvalues;
	com.wiris.quizzes.Assertion.paramdefault = new Hash();
	var constants = String.fromCharCode(960) + ", e, i, j";
	var functions = "exp, log, ln, sin, cos, tan, asin, acos, atan, cosec, sec, cotan, acosec, asec, acotan, sinh, cosh, tanh, asinh, acosh, atanh, min, max, sign";
	paramvalues = new Hash();
	paramvalues.set("constants",constants);
	paramvalues.set("functions",functions);
	com.wiris.quizzes.Assertion.paramdefault.set("syntax_expression",paramvalues);
	paramvalues = new Hash();
	paramvalues.set("constants",constants);
	paramvalues.set("functions",functions);
	com.wiris.quizzes.Assertion.paramdefault.set("syntax_list",paramvalues);
	paramvalues = new Hash();
	paramvalues.set("constants",constants);
	paramvalues.set("units","sr, m, g, s, E, K, mol, cd, rad, h, min, l, N, Pa, Hz, W,J, C, V, " + String.fromCharCode(937) + ", F, S, Wb, b, H, T, lx, lm, Gy, Bq, Sv, kat");
	paramvalues.set("unitprefixes","y, z, a, f, p, n, " + String.fromCharCode(181) + ", m, c, d, da, h, k, M, G, T, P, E, Z, Y");
	paramvalues.set("mixedfractions","false");
	com.wiris.quizzes.Assertion.paramdefault.set("syntax_quantity",paramvalues);
	paramvalues = new Hash();
	paramvalues.set("value","");
	com.wiris.quizzes.Assertion.paramdefault.set("check_divisible",paramvalues);
	paramvalues = new Hash();
	paramvalues.set("unit","");
	com.wiris.quizzes.Assertion.paramdefault.set("check_unit",paramvalues);
	paramvalues = new Hash();
	paramvalues.set("unit","");
	com.wiris.quizzes.Assertion.paramdefault.set("check_unit_literal",paramvalues);
	paramvalues = new Hash();
	paramvalues.set("digits","");
	com.wiris.quizzes.Assertion.paramdefault.set("check_no_more_decimals",paramvalues);
	paramvalues = new Hash();
	paramvalues.set("digits","");
	com.wiris.quizzes.Assertion.paramdefault.set("check_no_more_digits",paramvalues);
	paramvalues = new Hash();
	paramvalues.set("name","");
	com.wiris.quizzes.Assertion.paramdefault.set("equivalent_function",paramvalues);
}
com.wiris.quizzes.Assertion.getParameterNames = function(name) {
	if(com.wiris.quizzes.Assertion.paramnames == null) com.wiris.quizzes.Assertion.initParams();
	return com.wiris.quizzes.Assertion.paramnames.get(name);
}
com.wiris.quizzes.Assertion.getParameterDefaultValue = function(assertion,parameter) {
	var value;
	if(com.wiris.quizzes.Assertion.paramdefault == null) com.wiris.quizzes.Assertion.initParams();
	if(com.wiris.quizzes.Assertion.paramdefault.exists(assertion) && com.wiris.quizzes.Assertion.paramdefault.get(assertion).exists(parameter)) value = com.wiris.quizzes.Assertion.paramdefault.get(assertion).get(parameter); else value = "";
	return value;
}
com.wiris.quizzes.Assertion.prototype.name = null;
com.wiris.quizzes.Assertion.prototype.correctAnswer = null;
com.wiris.quizzes.Assertion.prototype.answer = null;
com.wiris.quizzes.Assertion.prototype.parameters = null;
com.wiris.quizzes.Assertion.prototype.onSerialize = function(s) {
	s.beginTag(com.wiris.quizzes.Assertion.tagName);
	this.name = s.attributeString("name",this.name,null);
	this.correctAnswer = s.attributeInt("correctAnswer",this.correctAnswer,0);
	this.answer = s.attributeInt("answer",this.answer,0);
	this.parameters = s.serializeArray(this.parameters,null);
	s.endTag();
}
com.wiris.quizzes.Assertion.prototype.newInstance = function() {
	return new com.wiris.quizzes.Assertion();
}
com.wiris.quizzes.Assertion.prototype.setParam = function(name,value) {
	if(this.parameters == null) this.parameters = new Array();
	if(this.isDefaultParameterValue(name,value)) {
		var j;
		var _g1 = 0, _g = this.parameters.length;
		while(_g1 < _g) {
			var j1 = _g1++;
			if(this.parameters[j1].name == name) this.parameters.remove(this.parameters[j1]);
		}
	} else {
		var found = false;
		var i;
		var _g1 = 0, _g = this.parameters.length;
		while(_g1 < _g) {
			var i1 = _g1++;
			var p = this.parameters[i1];
			if(p.name == name) {
				p.content = value;
				found = true;
			}
		}
		if(!found) {
			var q = new com.wiris.quizzes.AssertionParam();
			q.name = name;
			q.content = value;
			q.type = com.wiris.quizzes.MathContent.TYPE_TEXT;
			this.parameters.push(q);
		}
	}
}
com.wiris.quizzes.Assertion.prototype.getParam = function(name) {
	if(this.parameters != null) {
		var i;
		var _g1 = 0, _g = this.parameters.length;
		while(_g1 < _g) {
			var i1 = _g1++;
			if(this.parameters[i1].name == name) return this.parameters[i1].content;
		}
	}
	if(com.wiris.quizzes.Assertion.paramdefault == null) com.wiris.quizzes.Assertion.initParams();
	if(com.wiris.quizzes.Assertion.paramdefault.exists(this.name)) {
		var values = com.wiris.quizzes.Assertion.paramdefault.get(this.name);
		if(values.exists(name)) return values.get(name);
	}
	return null;
}
com.wiris.quizzes.Assertion.prototype.isDefaultParameterValue = function(name,value) {
	var defValue = com.wiris.quizzes.Assertion.getParameterDefaultValue(this.name,name);
	return this.equalLists(defValue,value);
}
com.wiris.quizzes.Assertion.prototype.equalLists = function(a,b) {
	var aa = a.split(",");
	var bb = b.split(",");
	if(aa.length != bb.length) return false;
	var i;
	var _g1 = 0, _g = aa.length;
	while(_g1 < _g) {
		var i1 = _g1++;
		if(!this.inArray(aa[i1],bb)) return false;
	}
	return true;
}
com.wiris.quizzes.Assertion.prototype.inArray = function(e,a) {
	var i;
	var _g1 = 0, _g = a.length;
	while(_g1 < _g) {
		var i1 = _g1++;
		if(e == a[i1]) return true;
	}
	return false;
}
com.wiris.quizzes.Assertion.prototype.__class__ = com.wiris.quizzes.Assertion;
com.wiris.quizzes.HttpImpl = function(url) {
	if( url === $_ ) return;
	haxe.Http.call(this,url);
	this.async = false;
}
com.wiris.quizzes.HttpImpl.__name__ = ["com","wiris","quizzes","HttpImpl"];
com.wiris.quizzes.HttpImpl.__super__ = haxe.Http;
for(var k in haxe.Http.prototype ) com.wiris.quizzes.HttpImpl.prototype[k] = haxe.Http.prototype[k];
com.wiris.quizzes.HttpImpl.prototype.response = null;
com.wiris.quizzes.HttpImpl.prototype.onData = function(data) {
	this.response = data;
}
com.wiris.quizzes.HttpImpl.prototype.onError = function(msg) {
	throw msg;
}
com.wiris.quizzes.HttpImpl.prototype.__class__ = com.wiris.quizzes.HttpImpl;
if(!com.wiris.system) com.wiris.system = {}
com.wiris.system.Utf8 = function(p) {
}
com.wiris.system.Utf8.__name__ = ["com","wiris","system","Utf8"];
com.wiris.system.Utf8.getLength = function(s) {
	return s.length;
}
com.wiris.system.Utf8.charCodeAt = function(s,i) {
	return s.charCodeAt(i);
}
com.wiris.system.Utf8.charAt = function(s,i) {
	return s.charAt(i);
}
com.wiris.system.Utf8.uchr = function(i) {
	return String.fromCharCode(i);
}
com.wiris.system.Utf8.sub = function(s,pos,len) {
	return s.substr(pos,len);
}
com.wiris.system.Utf8.prototype.__class__ = com.wiris.system.Utf8;
IntIter = function(min,max) {
	if( min === $_ ) return;
	this.min = min;
	this.max = max;
}
IntIter.__name__ = ["IntIter"];
IntIter.prototype.min = null;
IntIter.prototype.max = null;
IntIter.prototype.hasNext = function() {
	return this.min < this.max;
}
IntIter.prototype.next = function() {
	return this.min++;
}
IntIter.prototype.__class__ = IntIter;
com.wiris.quizzes.JsEditorInterface = function() { }
com.wiris.quizzes.JsEditorInterface.__name__ = ["com","wiris","quizzes","JsEditorInterface"];
com.wiris.quizzes.JsEditorInterface.prototype.getMathML = null;
com.wiris.quizzes.JsEditorInterface.prototype.setMathML = null;
com.wiris.quizzes.JsEditorInterface.prototype.isReady = null;
com.wiris.quizzes.JsEditorInterface.prototype.getElement = null;
com.wiris.quizzes.JsEditorInterface.prototype.getEditorModel = null;
com.wiris.quizzes.JsEditorInterface.prototype.__class__ = com.wiris.quizzes.JsEditorInterface;
com.wiris.quizzes.QuestionRequest = function(p) {
	if( p === $_ ) return;
	com.wiris.quizzes.Serializable.call(this);
}
com.wiris.quizzes.QuestionRequest.__name__ = ["com","wiris","quizzes","QuestionRequest"];
com.wiris.quizzes.QuestionRequest.__super__ = com.wiris.quizzes.Serializable;
for(var k in com.wiris.quizzes.Serializable.prototype ) com.wiris.quizzes.QuestionRequest.prototype[k] = com.wiris.quizzes.Serializable.prototype[k];
com.wiris.quizzes.QuestionRequest.prototype.question = null;
com.wiris.quizzes.QuestionRequest.prototype.userData = null;
com.wiris.quizzes.QuestionRequest.prototype.processes = null;
com.wiris.quizzes.QuestionRequest.prototype.onSerialize = function(s) {
	s.beginTag(com.wiris.quizzes.QuestionRequest.tagName);
	this.question = s.serializeChildName(this.question,com.wiris.quizzes.Question.tagName);
	this.userData = s.serializeChildName(this.userData,com.wiris.quizzes.UserData.tagName);
	this.processes = s.serializeArrayName(this.processes,"processes");
	s.endTag();
}
com.wiris.quizzes.QuestionRequest.prototype.newInstance = function() {
	return new com.wiris.quizzes.QuestionRequest();
}
com.wiris.quizzes.QuestionRequest.prototype.checkAssertions = function() {
	var p = new com.wiris.quizzes.ProcessGetCheckAssertions();
	this.addProcess(p);
}
com.wiris.quizzes.QuestionRequest.prototype.variables = function(names,type) {
	var p = new com.wiris.quizzes.ProcessGetVariables();
	var sb = new StringBuf();
	var i;
	var _g1 = 0, _g = names.length;
	while(_g1 < _g) {
		var i1 = _g1++;
		if(i1 != 0) sb.b[sb.b.length] = "," == null?"null":",";
		sb.add(names[i1]);
	}
	p.names = sb.b.join("");
	p.type = type;
	this.addProcess(p);
}
com.wiris.quizzes.QuestionRequest.prototype.addProcess = function(p) {
	if(this.processes == null) this.processes = new Array();
	this.processes.push(p);
}
com.wiris.quizzes.QuestionRequest.prototype.__class__ = com.wiris.quizzes.QuestionRequest;
com.wiris.quizzes.UserData = function(p) {
	if( p === $_ ) return;
	com.wiris.quizzes.Serializable.call(this);
	this.randomSeed = -1;
}
com.wiris.quizzes.UserData.__name__ = ["com","wiris","quizzes","UserData"];
com.wiris.quizzes.UserData.__super__ = com.wiris.quizzes.Serializable;
for(var k in com.wiris.quizzes.Serializable.prototype ) com.wiris.quizzes.UserData.prototype[k] = com.wiris.quizzes.Serializable.prototype[k];
com.wiris.quizzes.UserData.prototype.randomSeed = null;
com.wiris.quizzes.UserData.prototype.answers = null;
com.wiris.quizzes.UserData.prototype.onSerialize = function(s) {
	s.beginTag(com.wiris.quizzes.UserData.tagName);
	this.randomSeed = s.serializeIntName("randomSeed",this.randomSeed,-1);
	s.serializeArrayName(this.answers,"answers");
	s.endTag();
}
com.wiris.quizzes.UserData.prototype.newInstance = function() {
	return new com.wiris.quizzes.UserData();
}
com.wiris.quizzes.UserData.prototype.setUserAnswer = function(index,content) {
	if(index < 0) throw "Invalid index: " + index;
	if(this.answers == null) this.answers = new Array();
	while(this.answers.length <= index) this.answers.push(new com.wiris.quizzes.Answer());
	var a = this.answers[index];
	a.id = index;
	a.set(content);
}
com.wiris.quizzes.UserData.prototype.__class__ = com.wiris.quizzes.UserData;
if(typeof js=='undefined') js = {}
js.Boot = function() { }
js.Boot.__name__ = ["js","Boot"];
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
js.Boot.__trace = function(v,i) {
	var msg = i != null?i.fileName + ":" + i.lineNumber + ": ":"";
	msg += js.Boot.__unhtml(js.Boot.__string_rec(v,"")) + "<br/>";
	var d = document.getElementById("haxe:trace");
	if(d == null) alert("No haxe:trace element defined\n" + msg); else d.innerHTML += msg;
}
js.Boot.__clear_trace = function() {
	var d = document.getElementById("haxe:trace");
	if(d != null) d.innerHTML = "";
}
js.Boot.__closure = function(o,f) {
	var m = o[f];
	if(m == null) return null;
	var f1 = function() {
		return m.apply(o,arguments);
	};
	f1.scope = o;
	f1.method = m;
	return f1;
}
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ != null || o.__ename__ != null)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__ != null) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2, _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			var _g = 0;
			while(_g < l) {
				var i1 = _g++;
				str += (i1 > 0?",":"") + js.Boot.__string_rec(o[i1],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) { ;
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
}
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0, _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
}
js.Boot.__instanceof = function(o,cl) {
	try {
		if(o instanceof cl) {
			if(cl == Array) return o.__enum__ == null;
			return true;
		}
		if(js.Boot.__interfLoop(o.__class__,cl)) return true;
	} catch( e ) {
		if(cl == null) return false;
	}
	switch(cl) {
	case Int:
		return Math.ceil(o%2147483648.0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return o === true || o === false;
	case String:
		return typeof(o) == "string";
	case Dynamic:
		return true;
	default:
		if(o == null) return false;
		return o.__enum__ == cl || cl == Class && o.__name__ != null || cl == Enum && o.__ename__ != null;
	}
}
js.Boot.__init = function() {
	js.Lib.isIE = typeof document!='undefined' && document.all != null && typeof window!='undefined' && window.opera == null;
	js.Lib.isOpera = typeof window!='undefined' && window.opera != null;
	Array.prototype.copy = Array.prototype.slice;
	Array.prototype.insert = function(i,x) {
		this.splice(i,0,x);
	};
	Array.prototype.remove = Array.prototype.indexOf?function(obj) {
		var idx = this.indexOf(obj);
		if(idx == -1) return false;
		this.splice(idx,1);
		return true;
	}:function(obj) {
		var i = 0;
		var l = this.length;
		while(i < l) {
			if(this[i] == obj) {
				this.splice(i,1);
				return true;
			}
			i++;
		}
		return false;
	};
	Array.prototype.iterator = function() {
		return { cur : 0, arr : this, hasNext : function() {
			return this.cur < this.arr.length;
		}, next : function() {
			return this.arr[this.cur++];
		}};
	};
	if(String.prototype.cca == null) String.prototype.cca = String.prototype.charCodeAt;
	String.prototype.charCodeAt = function(i) {
		var x = this.cca(i);
		if(x != x) return null;
		return x;
	};
	var oldsub = String.prototype.substr;
	String.prototype.substr = function(pos,len) {
		if(pos != null && pos != 0 && len != null && len < 0) return "";
		if(len == null) len = this.length;
		if(pos < 0) {
			pos = this.length + pos;
			if(pos < 0) pos = 0;
		} else if(len < 0) len = this.length + len - pos;
		return oldsub.apply(this,[pos,len]);
	};
	$closure = js.Boot.__closure;
}
js.Boot.prototype.__class__ = js.Boot;
com.wiris.system.Storage = function(location) {
	if( location === $_ ) return;
	this.location = location;
	if(com.wiris.system.Storage.directorySeparator == null) com.wiris.system.Storage.setDirectorySeparator();
	if(com.wiris.system.Storage.resourcesDir == null) com.wiris.system.Storage.setResourcesDir();
}
com.wiris.system.Storage.__name__ = ["com","wiris","system","Storage"];
com.wiris.system.Storage.directorySeparator = null;
com.wiris.system.Storage.resourcesDir = null;
com.wiris.system.Storage.newResourceStorage = function(name) {
	return new com.wiris.system.Storage(com.wiris.system.Storage.resourcesDir + com.wiris.system.Storage.directorySeparator + name);
}
com.wiris.system.Storage.newStorage = function(name) {
	return new com.wiris.system.Storage(name);
}
com.wiris.system.Storage.setResourcesDir = function() {
	com.wiris.system.Storage.resourcesDir = ".";
}
com.wiris.system.Storage.setDirectorySeparator = function() {
	var sep;
	sep = "/";
	com.wiris.system.Storage.directorySeparator = sep;
}
com.wiris.system.Storage.prototype.location = null;
com.wiris.system.Storage.prototype.read = function() {
	var res = null;
	throw "Not implemented!";
	return res;
}
com.wiris.system.Storage.prototype.writeBinary = function(bs) {
	throw "Not implemented!";
}
com.wiris.system.Storage.prototype.readBinary = function() {
	var res = null;
	throw "Not implemented!";
	return res;
}
com.wiris.system.Storage.prototype.exists = function() {
	var exists = false;
	return exists;
}
com.wiris.system.Storage.prototype.__class__ = com.wiris.system.Storage;
EReg = function(r,opt) {
	if( r === $_ ) return;
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
}
EReg.__name__ = ["EReg"];
EReg.prototype.r = null;
EReg.prototype.match = function(s) {
	this.r.m = this.r.exec(s);
	this.r.s = s;
	this.r.l = RegExp.leftContext;
	this.r.r = RegExp.rightContext;
	return this.r.m != null;
}
EReg.prototype.matched = function(n) {
	return this.r.m != null && n >= 0 && n < this.r.m.length?this.r.m[n]:(function($this) {
		var $r;
		throw "EReg::matched";
		return $r;
	}(this));
}
EReg.prototype.matchedLeft = function() {
	if(this.r.m == null) throw "No string matched";
	if(this.r.l == null) return this.r.s.substr(0,this.r.m.index);
	return this.r.l;
}
EReg.prototype.matchedRight = function() {
	if(this.r.m == null) throw "No string matched";
	if(this.r.r == null) {
		var sz = this.r.m.index + this.r.m[0].length;
		return this.r.s.substr(sz,this.r.s.length - sz);
	}
	return this.r.r;
}
EReg.prototype.matchedPos = function() {
	if(this.r.m == null) throw "No string matched";
	return { pos : this.r.m.index, len : this.r.m[0].length};
}
EReg.prototype.split = function(s) {
	var d = "#__delim__#";
	return s.replace(this.r,d).split(d);
}
EReg.prototype.replace = function(s,by) {
	return s.replace(this.r,by);
}
EReg.prototype.customReplace = function(s,f) {
	var buf = new StringBuf();
	while(true) {
		if(!this.match(s)) break;
		buf.add(this.matchedLeft());
		buf.add(f(this));
		s = this.matchedRight();
	}
	buf.b[buf.b.length] = s == null?"null":s;
	return buf.b.join("");
}
EReg.prototype.__class__ = EReg;
Xml = function(p) {
}
Xml.__name__ = ["Xml"];
Xml.Element = null;
Xml.PCData = null;
Xml.CData = null;
Xml.Comment = null;
Xml.DocType = null;
Xml.Prolog = null;
Xml.Document = null;
Xml.parse = function(str) {
	var rules = [Xml.enode,Xml.epcdata,Xml.eend,Xml.ecdata,Xml.edoctype,Xml.ecomment,Xml.eprolog];
	var nrules = rules.length;
	var current = Xml.createDocument();
	var stack = new List();
	while(str.length > 0) {
		var i = 0;
		try {
			while(i < nrules) {
				var r = rules[i];
				if(r.match(str)) {
					switch(i) {
					case 0:
						var x = Xml.createElement(r.matched(1));
						current.addChild(x);
						str = r.matchedRight();
						while(Xml.eattribute.match(str)) {
							x.set(Xml.eattribute.matched(1),Xml.eattribute.matched(3));
							str = Xml.eattribute.matchedRight();
						}
						if(!Xml.eclose.match(str)) {
							i = nrules;
							throw "__break__";
						}
						if(Xml.eclose.matched(1) == ">") {
							stack.push(current);
							current = x;
						}
						str = Xml.eclose.matchedRight();
						break;
					case 1:
						var x = Xml.createPCData(r.matched(0));
						current.addChild(x);
						str = r.matchedRight();
						break;
					case 2:
						if(current._children != null && current._children.length == 0) {
							var e = Xml.createPCData("");
							current.addChild(e);
						}
						if(r.matched(1) != current._nodeName || stack.isEmpty()) {
							i = nrules;
							throw "__break__";
						}
						current = stack.pop();
						str = r.matchedRight();
						break;
					case 3:
						str = r.matchedRight();
						if(!Xml.ecdata_end.match(str)) throw "End of CDATA section not found";
						var x = Xml.createCData(Xml.ecdata_end.matchedLeft());
						current.addChild(x);
						str = Xml.ecdata_end.matchedRight();
						break;
					case 4:
						var pos = 0;
						var count = 0;
						var old = str;
						try {
							while(true) {
								if(!Xml.edoctype_elt.match(str)) throw "End of DOCTYPE section not found";
								var p = Xml.edoctype_elt.matchedPos();
								pos += p.pos + p.len;
								str = Xml.edoctype_elt.matchedRight();
								switch(Xml.edoctype_elt.matched(0)) {
								case "[":
									count++;
									break;
								case "]":
									count--;
									if(count < 0) throw "Invalid ] found in DOCTYPE declaration";
									break;
								default:
									if(count == 0) throw "__break__";
								}
							}
						} catch( e ) { if( e != "__break__" ) throw e; }
						var x = Xml.createDocType(old.substr(10,pos - 11));
						current.addChild(x);
						break;
					case 5:
						if(!Xml.ecomment_end.match(str)) throw "Unclosed Comment";
						var p = Xml.ecomment_end.matchedPos();
						var x = Xml.createComment(str.substr(4,p.pos + p.len - 7));
						current.addChild(x);
						str = Xml.ecomment_end.matchedRight();
						break;
					case 6:
						var prolog = r.matched(0);
						var x = Xml.createProlog(prolog.substr(2,prolog.length - 4));
						current.addChild(x);
						str = r.matchedRight();
						break;
					}
					throw "__break__";
				}
				i += 1;
			}
		} catch( e ) { if( e != "__break__" ) throw e; }
		if(i == nrules) {
			if(str.length > 10) throw "Xml parse error : Unexpected " + str.substr(0,10) + "..."; else throw "Xml parse error : Unexpected " + str;
		}
	}
	if(!stack.isEmpty()) throw "Xml parse error : Unclosed " + stack.last().getNodeName();
	return current;
}
Xml.createElement = function(name) {
	var r = new Xml();
	r.nodeType = Xml.Element;
	r._children = new Array();
	r._attributes = new Hash();
	r.setNodeName(name);
	return r;
}
Xml.createPCData = function(data) {
	var r = new Xml();
	r.nodeType = Xml.PCData;
	r.setNodeValue(data);
	return r;
}
Xml.createCData = function(data) {
	var r = new Xml();
	r.nodeType = Xml.CData;
	r.setNodeValue(data);
	return r;
}
Xml.createComment = function(data) {
	var r = new Xml();
	r.nodeType = Xml.Comment;
	r.setNodeValue(data);
	return r;
}
Xml.createDocType = function(data) {
	var r = new Xml();
	r.nodeType = Xml.DocType;
	r.setNodeValue(data);
	return r;
}
Xml.createProlog = function(data) {
	var r = new Xml();
	r.nodeType = Xml.Prolog;
	r.setNodeValue(data);
	return r;
}
Xml.createDocument = function() {
	var r = new Xml();
	r.nodeType = Xml.Document;
	r._children = new Array();
	return r;
}
Xml.prototype.nodeType = null;
Xml.prototype.nodeName = null;
Xml.prototype.nodeValue = null;
Xml.prototype.parent = null;
Xml.prototype._nodeName = null;
Xml.prototype._nodeValue = null;
Xml.prototype._attributes = null;
Xml.prototype._children = null;
Xml.prototype._parent = null;
Xml.prototype.getNodeName = function() {
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	return this._nodeName;
}
Xml.prototype.setNodeName = function(n) {
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	return this._nodeName = n;
}
Xml.prototype.getNodeValue = function() {
	if(this.nodeType == Xml.Element || this.nodeType == Xml.Document) throw "bad nodeType";
	return this._nodeValue;
}
Xml.prototype.setNodeValue = function(v) {
	if(this.nodeType == Xml.Element || this.nodeType == Xml.Document) throw "bad nodeType";
	return this._nodeValue = v;
}
Xml.prototype.getParent = function() {
	return this._parent;
}
Xml.prototype.get = function(att) {
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	return this._attributes.get(att);
}
Xml.prototype.set = function(att,value) {
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	this._attributes.set(att,value);
}
Xml.prototype.remove = function(att) {
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	this._attributes.remove(att);
}
Xml.prototype.exists = function(att) {
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	return this._attributes.exists(att);
}
Xml.prototype.attributes = function() {
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	return this._attributes.keys();
}
Xml.prototype.iterator = function() {
	if(this._children == null) throw "bad nodetype";
	return { cur : 0, x : this._children, hasNext : function() {
		return this.cur < this.x.length;
	}, next : function() {
		return this.x[this.cur++];
	}};
}
Xml.prototype.elements = function() {
	if(this._children == null) throw "bad nodetype";
	return { cur : 0, x : this._children, hasNext : function() {
		var k = this.cur;
		var l = this.x.length;
		while(k < l) {
			if(this.x[k].nodeType == Xml.Element) break;
			k += 1;
		}
		this.cur = k;
		return k < l;
	}, next : function() {
		var k = this.cur;
		var l = this.x.length;
		while(k < l) {
			var n = this.x[k];
			k += 1;
			if(n.nodeType == Xml.Element) {
				this.cur = k;
				return n;
			}
		}
		return null;
	}};
}
Xml.prototype.elementsNamed = function(name) {
	if(this._children == null) throw "bad nodetype";
	return { cur : 0, x : this._children, hasNext : function() {
		var k = this.cur;
		var l = this.x.length;
		while(k < l) {
			var n = this.x[k];
			if(n.nodeType == Xml.Element && n._nodeName == name) break;
			k++;
		}
		this.cur = k;
		return k < l;
	}, next : function() {
		var k = this.cur;
		var l = this.x.length;
		while(k < l) {
			var n = this.x[k];
			k++;
			if(n.nodeType == Xml.Element && n._nodeName == name) {
				this.cur = k;
				return n;
			}
		}
		return null;
	}};
}
Xml.prototype.firstChild = function() {
	if(this._children == null) throw "bad nodetype";
	return this._children[0];
}
Xml.prototype.firstElement = function() {
	if(this._children == null) throw "bad nodetype";
	var cur = 0;
	var l = this._children.length;
	while(cur < l) {
		var n = this._children[cur];
		if(n.nodeType == Xml.Element) return n;
		cur++;
	}
	return null;
}
Xml.prototype.addChild = function(x) {
	if(this._children == null) throw "bad nodetype";
	if(x._parent != null) x._parent._children.remove(x);
	x._parent = this;
	this._children.push(x);
}
Xml.prototype.removeChild = function(x) {
	if(this._children == null) throw "bad nodetype";
	var b = this._children.remove(x);
	if(b) x._parent = null;
	return b;
}
Xml.prototype.insertChild = function(x,pos) {
	if(this._children == null) throw "bad nodetype";
	if(x._parent != null) x._parent._children.remove(x);
	x._parent = this;
	this._children.insert(pos,x);
}
Xml.prototype.toString = function() {
	if(this.nodeType == Xml.PCData) return this._nodeValue;
	if(this.nodeType == Xml.CData) return "<![CDATA[" + this._nodeValue + "]]>";
	if(this.nodeType == Xml.Comment) return "<!--" + this._nodeValue + "-->";
	if(this.nodeType == Xml.DocType) return "<!DOCTYPE " + this._nodeValue + ">";
	if(this.nodeType == Xml.Prolog) return "<?" + this._nodeValue + "?>";
	var s = new StringBuf();
	if(this.nodeType == Xml.Element) {
		s.b[s.b.length] = "<" == null?"null":"<";
		s.add(this._nodeName);
		var $it0 = this._attributes.keys();
		while( $it0.hasNext() ) {
			var k = $it0.next();
			s.b[s.b.length] = " " == null?"null":" ";
			s.b[s.b.length] = k == null?"null":k;
			s.b[s.b.length] = "=\"" == null?"null":"=\"";
			s.add(this._attributes.get(k));
			s.b[s.b.length] = "\"" == null?"null":"\"";
		}
		if(this._children.length == 0) {
			s.b[s.b.length] = "/>" == null?"null":"/>";
			return s.b.join("");
		}
		s.b[s.b.length] = ">" == null?"null":">";
	}
	var $it1 = this.iterator();
	while( $it1.hasNext() ) {
		var x = $it1.next();
		s.add(x.toString());
	}
	if(this.nodeType == Xml.Element) {
		s.b[s.b.length] = "</" == null?"null":"</";
		s.add(this._nodeName);
		s.b[s.b.length] = ">" == null?"null":">";
	}
	return s.b.join("");
}
Xml.prototype.__class__ = Xml;
com.wiris.quizzes.CorrectAnswer = function(p) {
	if( p === $_ ) return;
	com.wiris.quizzes.MathContent.call(this);
	this.weight = 1.0;
	this.id = 0;
}
com.wiris.quizzes.CorrectAnswer.__name__ = ["com","wiris","quizzes","CorrectAnswer"];
com.wiris.quizzes.CorrectAnswer.__super__ = com.wiris.quizzes.MathContent;
for(var k in com.wiris.quizzes.MathContent.prototype ) com.wiris.quizzes.CorrectAnswer.prototype[k] = com.wiris.quizzes.MathContent.prototype[k];
com.wiris.quizzes.CorrectAnswer.prototype.weight = null;
com.wiris.quizzes.CorrectAnswer.prototype.id = null;
com.wiris.quizzes.CorrectAnswer.prototype.newInstance = function() {
	return new com.wiris.quizzes.CorrectAnswer();
}
com.wiris.quizzes.CorrectAnswer.prototype.onSerialize = function(s) {
	s.beginTag(com.wiris.quizzes.CorrectAnswer.tagName);
	this.id = s.attributeInt("id",this.id,0);
	this.weight = s.attributeFloat("weight",this.weight,1.0);
	com.wiris.quizzes.MathContent.prototype.onSerializeInner.call(this,s);
	s.endTag();
}
com.wiris.quizzes.CorrectAnswer.prototype.__class__ = com.wiris.quizzes.CorrectAnswer;
haxe.Timer = function(time_ms) {
	if( time_ms === $_ ) return;
	var arr = haxe_timers;
	this.id = arr.length;
	arr[this.id] = this;
	this.timerId = window.setInterval("haxe_timers[" + this.id + "].run();",time_ms);
}
haxe.Timer.__name__ = ["haxe","Timer"];
haxe.Timer.delay = function(f,time_ms) {
	var t = new haxe.Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
}
haxe.Timer.measure = function(f,pos) {
	var t0 = haxe.Timer.stamp();
	var r = f();
	haxe.Log.trace(haxe.Timer.stamp() - t0 + "s",pos);
	return r;
}
haxe.Timer.stamp = function() {
	return Date.now().getTime() / 1000;
}
haxe.Timer.prototype.id = null;
haxe.Timer.prototype.timerId = null;
haxe.Timer.prototype.stop = function() {
	if(this.id == null) return;
	window.clearInterval(this.timerId);
	var arr = haxe_timers;
	arr[this.id] = null;
	if(this.id > 100 && this.id == arr.length - 1) {
		var p = this.id - 1;
		while(p >= 0 && arr[p] == null) p--;
		arr = arr.slice(0,p + 1);
	}
	this.id = null;
}
haxe.Timer.prototype.run = function() {
}
haxe.Timer.prototype.__class__ = haxe.Timer;
com.wiris.quizzes.JsEditorModelInterface = function() { }
com.wiris.quizzes.JsEditorModelInterface.__name__ = ["com","wiris","quizzes","JsEditorModelInterface"];
com.wiris.quizzes.JsEditorModelInterface.prototype.getMathML = null;
com.wiris.quizzes.JsEditorModelInterface.prototype.setMathML = null;
com.wiris.quizzes.JsEditorModelInterface.prototype.addEditorListener = null;
com.wiris.quizzes.JsEditorModelInterface.prototype.__class__ = com.wiris.quizzes.JsEditorModelInterface;
com.wiris.quizzes.JsEditorListener = function(element,controller) {
	if( element === $_ ) return;
	this.controller = controller;
	this.element = element;
}
com.wiris.quizzes.JsEditorListener.__name__ = ["com","wiris","quizzes","JsEditorListener"];
com.wiris.quizzes.JsEditorListener.prototype.controller = null;
com.wiris.quizzes.JsEditorListener.prototype.element = null;
com.wiris.quizzes.JsEditorListener.prototype.contentChanged = function(source) {
	var mml = source.getMathML();
	this.element.value = mml;
	if(this.controller != null) this.controller.updateInputValue();
}
com.wiris.quizzes.JsEditorListener.prototype.caretPositionChanged = function(source) {
}
com.wiris.quizzes.JsEditorListener.prototype.clipboardChanged = function(source) {
}
com.wiris.quizzes.JsEditorListener.prototype.mathmlSetted = function(source) {
}
com.wiris.quizzes.JsEditorListener.prototype.__class__ = com.wiris.quizzes.JsEditorListener;
com.wiris.quizzes.RequestBuilder = function(p) {
}
com.wiris.quizzes.RequestBuilder.__name__ = ["com","wiris","quizzes","RequestBuilder"];
com.wiris.quizzes.RequestBuilder.singleton = null;
com.wiris.quizzes.RequestBuilder.getInstance = function() {
	if(com.wiris.quizzes.RequestBuilder.singleton == null) com.wiris.quizzes.RequestBuilder.singleton = new com.wiris.quizzes.RequestBuilder();
	return com.wiris.quizzes.RequestBuilder.singleton;
}
com.wiris.quizzes.RequestBuilder.main = function() {
	var qi = "<questionInstance><userData><randomSeed>3333</randomSeed></userData></questionInstance>";
	var qqi = com.wiris.quizzes.RequestBuilder.getInstance().readQuestionInstance(qi);
	haxe.Log.trace(qqi.serialize(),{ fileName : "RequestBuilder.hx", lineNumber : 299, className : "com.wiris.quizzes.RequestBuilder", methodName : "main"});
}
com.wiris.quizzes.RequestBuilder.prototype.serializer = null;
com.wiris.quizzes.RequestBuilder.prototype.readQuestion = function(xml) {
	var s = this.getSerializer();
	var elem = s.read(xml);
	var tag = s.getTagName(elem);
	if(!(tag == "question")) throw "Unexpected root tag " + tag + ". Expected question.";
	return (function($this) {
		var $r;
		var $t = elem;
		if(Std["is"]($t,com.wiris.quizzes.Question)) $t; else throw "Class cast error";
		$r = $t;
		return $r;
	}(this));
}
com.wiris.quizzes.RequestBuilder.prototype.readQuestionInstance = function(xml) {
	var s = this.getSerializer();
	var elem = s.read(xml);
	var tag = s.getTagName(elem);
	if(!(tag == "questionInstance")) throw "Unexpected root tag " + tag + ". Expected questionInstance.";
	return (function($this) {
		var $r;
		var $t = elem;
		if(Std["is"]($t,com.wiris.quizzes.QuestionInstance)) $t; else throw "Class cast error";
		$r = $t;
		return $r;
	}(this));
}
com.wiris.quizzes.RequestBuilder.prototype.newVariablesRequest = function(html,q,qi) {
	if(q == null) throw "Question q cannot be null.";
	if(qi == null || qi.userData == null) qi = new com.wiris.quizzes.QuestionInstance();
	var qr = new com.wiris.quizzes.QuestionRequest();
	qr.question = q;
	qr.userData = qi.userData;
	var h = new com.wiris.quizzes.HTMLTools();
	var variables = h.extractVariableNames(html);
	qr.variables(variables,com.wiris.quizzes.MathContent.TYPE_TEXT);
	qr.variables(variables,com.wiris.quizzes.MathContent.TYPE_MATHML);
	return qr;
}
com.wiris.quizzes.RequestBuilder.prototype.newEvalRequest = function(correctAnswer,userAnswer,q,qi) {
	return this.newEvalMultipleAnswersRequest([correctAnswer],[userAnswer],q,qi);
}
com.wiris.quizzes.RequestBuilder.prototype.newEvalMultipleAnswersRequest = function(correctAnswers,userAnswers,q,qi) {
	var qq = new com.wiris.quizzes.Question();
	if(q != null) {
		qq.wirisCasSession = q.wirisCasSession;
		qq.options = q.options;
	}
	var i, j;
	qq.assertions = new Array();
	if(q != null && q.assertions != null && q.assertions.length > 0) {
		var _g1 = 0, _g = q.assertions.length;
		while(_g1 < _g) {
			var i1 = _g1++;
			qq.assertions.push(q.assertions[i1]);
		}
	}
	var _g1 = 0, _g = correctAnswers.length;
	while(_g1 < _g) {
		var i1 = _g1++;
		var found = false;
		var k;
		var _g3 = 0, _g2 = qq.assertions.length;
		while(_g3 < _g2) {
			var k1 = _g3++;
			if(qq.assertions[k1].correctAnswer == i1) {
				found = true;
				break;
			}
		}
		if(!found) {
			j = Math.floor(1.0 * i1 / correctAnswers.length * userAnswers.length);
			qq.setAssertion(com.wiris.quizzes.Assertion.SYNTAX_EXPRESSION,i1,j);
			qq.setAssertion(com.wiris.quizzes.Assertion.EQUIVALENT_SYMBOLIC,i1,j);
		}
	}
	var _g1 = 0, _g = correctAnswers.length;
	while(_g1 < _g) {
		var i1 = _g1++;
		var value = correctAnswers[i1];
		if(value == null) value = "";
		if(qi != null && qi.hasVariables()) {
			var h = new com.wiris.quizzes.HTMLTools();
			var mathType = com.wiris.quizzes.MathContent.getMathType(value);
			var v = new Hash();
			var tv = qi.variables.get(mathType);
			if(tv != null) {
				v.set(mathType,tv);
				value = h.expandVariables(value,v);
			}
		}
		qq.setCorrectAnswer(i1,value);
	}
	var uu = new com.wiris.quizzes.UserData();
	if(qi != null && qi.userData != null) uu.randomSeed = qi.userData.randomSeed; else {
		var qqi = new com.wiris.quizzes.QuestionInstance();
		uu.randomSeed = qqi.userData.randomSeed;
	}
	var _g1 = 0, _g = userAnswers.length;
	while(_g1 < _g) {
		var i1 = _g1++;
		var answerValue = userAnswers[i1];
		if(answerValue == null) answerValue = "";
		uu.setUserAnswer(i1,userAnswers[i1]);
	}
	var qr = new com.wiris.quizzes.QuestionRequest();
	qr.question = qq;
	qr.userData = uu;
	qr.checkAssertions();
	return qr;
}
com.wiris.quizzes.RequestBuilder.prototype.newRequestFromXml = function(xml) {
	var s = this.getSerializer();
	var elem = s.read(xml);
	var req;
	var tag = s.getTagName(elem);
	if(tag == com.wiris.quizzes.QuestionRequest.tagName) req = (function($this) {
		var $r;
		var $t = elem;
		if(Std["is"]($t,com.wiris.quizzes.QuestionRequest)) $t; else throw "Class cast error";
		$r = $t;
		return $r;
	}(this)); else if(tag == com.wiris.quizzes.MultipleQuestionRequest.tagName) {
		var mqr = (function($this) {
			var $r;
			var $t = elem;
			if(Std["is"]($t,com.wiris.quizzes.MultipleQuestionRequest)) $t; else throw "Class cast error";
			$r = $t;
			return $r;
		}(this));
		req = mqr.questionRequests[0];
	} else throw "Unexpected XML root tag " + tag + ".";
	return req;
}
com.wiris.quizzes.RequestBuilder.prototype.newResponseFromXml = function(xml) {
	var mqr = this.newMultipleResponseFromXml(xml);
	return mqr.questionResponses[0];
}
com.wiris.quizzes.RequestBuilder.prototype.newMultipleResponseFromXml = function(xml) {
	var s = this.getSerializer();
	var elem = s.read(xml);
	var mqr;
	var tag = s.getTagName(elem);
	if(tag == com.wiris.quizzes.QuestionResponse.tagName) {
		var res = (function($this) {
			var $r;
			var $t = elem;
			if(Std["is"]($t,com.wiris.quizzes.QuestionResponse)) $t; else throw "Class cast error";
			$r = $t;
			return $r;
		}(this));
		mqr = new com.wiris.quizzes.MultipleQuestionResponse();
		mqr.questionResponses = new Array();
		mqr.questionResponses.push(res);
	} else if(tag == com.wiris.quizzes.MultipleQuestionResponse.tagName) mqr = (function($this) {
		var $r;
		var $t = elem;
		if(Std["is"]($t,com.wiris.quizzes.MultipleQuestionResponse)) $t; else throw "Class cast error";
		$r = $t;
		return $r;
	}(this)); else throw "Unexpected XML root tag " + tag + ".";
	return mqr;
}
com.wiris.quizzes.RequestBuilder.prototype.getSerializer = function() {
	if(this.serializer == null) {
		this.serializer = new com.wiris.quizzes.Serializer();
		this.serializer.register(new com.wiris.quizzes.Answer());
		this.serializer.register(new com.wiris.quizzes.Assertion());
		this.serializer.register(new com.wiris.quizzes.AssertionCheck());
		this.serializer.register(new com.wiris.quizzes.AssertionParam());
		this.serializer.register(new com.wiris.quizzes.CorrectAnswer());
		this.serializer.register(new com.wiris.quizzes.LocalData());
		this.serializer.register(new com.wiris.quizzes.MathContent());
		this.serializer.register(new com.wiris.quizzes.MultipleQuestionRequest());
		this.serializer.register(new com.wiris.quizzes.MultipleQuestionResponse());
		this.serializer.register(new com.wiris.quizzes.Option());
		this.serializer.register(new com.wiris.quizzes.ProcessGetCheckAssertions());
		this.serializer.register(new com.wiris.quizzes.ProcessGetVariables());
		this.serializer.register(new com.wiris.quizzes.Question());
		this.serializer.register(new com.wiris.quizzes.QuestionRequest());
		this.serializer.register(new com.wiris.quizzes.QuestionResponse());
		this.serializer.register(new com.wiris.quizzes.QuestionInstance());
		this.serializer.register(new com.wiris.quizzes.ResultError());
		this.serializer.register(new com.wiris.quizzes.ResultErrorLocation());
		this.serializer.register(new com.wiris.quizzes.ResultGetCheckAssertions());
		this.serializer.register(new com.wiris.quizzes.ResultGetVariables());
		this.serializer.register(new com.wiris.quizzes.UserData());
		this.serializer.register(new com.wiris.quizzes.Variable());
	}
	return this.serializer;
}
com.wiris.quizzes.RequestBuilder.prototype.__class__ = com.wiris.quizzes.RequestBuilder;
com.wiris.quizzes.Process = function(p) {
	if( p === $_ ) return;
	com.wiris.quizzes.Serializable.call(this);
}
com.wiris.quizzes.Process.__name__ = ["com","wiris","quizzes","Process"];
com.wiris.quizzes.Process.__super__ = com.wiris.quizzes.Serializable;
for(var k in com.wiris.quizzes.Serializable.prototype ) com.wiris.quizzes.Process.prototype[k] = com.wiris.quizzes.Serializable.prototype[k];
com.wiris.quizzes.Process.prototype.onSerialize = function(s) {
}
com.wiris.quizzes.Process.prototype.newInstance = function() {
	return new com.wiris.quizzes.Process();
}
com.wiris.quizzes.Process.prototype.__class__ = com.wiris.quizzes.Process;
com.wiris.quizzes.ProcessGetCheckAssertions = function(p) {
	if( p === $_ ) return;
	com.wiris.quizzes.Process.call(this);
}
com.wiris.quizzes.ProcessGetCheckAssertions.__name__ = ["com","wiris","quizzes","ProcessGetCheckAssertions"];
com.wiris.quizzes.ProcessGetCheckAssertions.__super__ = com.wiris.quizzes.Process;
for(var k in com.wiris.quizzes.Process.prototype ) com.wiris.quizzes.ProcessGetCheckAssertions.prototype[k] = com.wiris.quizzes.Process.prototype[k];
com.wiris.quizzes.ProcessGetCheckAssertions.prototype.onSerialize = function(s) {
	s.beginTag(com.wiris.quizzes.ProcessGetCheckAssertions.tagName);
	s.endTag();
}
com.wiris.quizzes.ProcessGetCheckAssertions.prototype.newInstance = function() {
	return new com.wiris.quizzes.ProcessGetCheckAssertions();
}
com.wiris.quizzes.ProcessGetCheckAssertions.prototype.__class__ = com.wiris.quizzes.ProcessGetCheckAssertions;
StringBuf = function(p) {
	if( p === $_ ) return;
	this.b = new Array();
}
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype.add = function(x) {
	this.b[this.b.length] = x == null?"null":x;
}
StringBuf.prototype.addSub = function(s,pos,len) {
	this.b[this.b.length] = s.substr(pos,len);
}
StringBuf.prototype.addChar = function(c) {
	this.b[this.b.length] = String.fromCharCode(c);
}
StringBuf.prototype.toString = function() {
	return this.b.join("");
}
StringBuf.prototype.b = null;
StringBuf.prototype.__class__ = StringBuf;
com.wiris.quizzes.ProcessGetVariables = function(p) {
	if( p === $_ ) return;
	com.wiris.quizzes.Process.call(this);
}
com.wiris.quizzes.ProcessGetVariables.__name__ = ["com","wiris","quizzes","ProcessGetVariables"];
com.wiris.quizzes.ProcessGetVariables.__super__ = com.wiris.quizzes.Process;
for(var k in com.wiris.quizzes.Process.prototype ) com.wiris.quizzes.ProcessGetVariables.prototype[k] = com.wiris.quizzes.Process.prototype[k];
com.wiris.quizzes.ProcessGetVariables.prototype.names = null;
com.wiris.quizzes.ProcessGetVariables.prototype.type = null;
com.wiris.quizzes.ProcessGetVariables.prototype.onSerialize = function(s) {
	s.beginTag(com.wiris.quizzes.ProcessGetVariables.tagName);
	this.names = s.attributeString("names",this.names,null);
	this.type = s.attributeString("type",this.type,"mathml");
	s.endTag();
}
com.wiris.quizzes.ProcessGetVariables.prototype.newInstance = function() {
	return new com.wiris.quizzes.ProcessGetVariables();
}
com.wiris.quizzes.ProcessGetVariables.prototype.__class__ = com.wiris.quizzes.ProcessGetVariables;
com.wiris.quizzes.AssertionParam = function(p) {
	if( p === $_ ) return;
	com.wiris.quizzes.MathContent.call(this);
}
com.wiris.quizzes.AssertionParam.__name__ = ["com","wiris","quizzes","AssertionParam"];
com.wiris.quizzes.AssertionParam.__super__ = com.wiris.quizzes.MathContent;
for(var k in com.wiris.quizzes.MathContent.prototype ) com.wiris.quizzes.AssertionParam.prototype[k] = com.wiris.quizzes.MathContent.prototype[k];
com.wiris.quizzes.AssertionParam.prototype.name = null;
com.wiris.quizzes.AssertionParam.prototype.newInstance = function() {
	return new com.wiris.quizzes.AssertionParam();
}
com.wiris.quizzes.AssertionParam.prototype.onSerialize = function(s) {
	s.beginTag(com.wiris.quizzes.AssertionParam.tagName);
	this.name = s.attributeString("name",this.name,null);
	com.wiris.quizzes.MathContent.prototype.onSerializeInner.call(this,s);
	s.endTag();
}
com.wiris.quizzes.AssertionParam.prototype.__class__ = com.wiris.quizzes.AssertionParam;
com.wiris.quizzes.Question = function(p) {
	if( p === $_ ) return;
	com.wiris.quizzes.Serializable.call(this);
}
com.wiris.quizzes.Question.__name__ = ["com","wiris","quizzes","Question"];
com.wiris.quizzes.Question.__super__ = com.wiris.quizzes.Serializable;
for(var k in com.wiris.quizzes.Serializable.prototype ) com.wiris.quizzes.Question.prototype[k] = com.wiris.quizzes.Serializable.prototype[k];
com.wiris.quizzes.Question.prototype.id = null;
com.wiris.quizzes.Question.prototype.wirisCasSession = null;
com.wiris.quizzes.Question.prototype.correctAnswers = null;
com.wiris.quizzes.Question.prototype.assertions = null;
com.wiris.quizzes.Question.prototype.options = null;
com.wiris.quizzes.Question.prototype.localData = null;
com.wiris.quizzes.Question.prototype.onSerialize = function(s) {
	s.beginTag(com.wiris.quizzes.Question.tagName);
	this.id = s.attributeString("id",this.id,null);
	this.wirisCasSession = s.childString("wirisCasSession",this.wirisCasSession,null);
	this.correctAnswers = s.serializeArrayName(this.correctAnswers,"correctAnswers");
	this.assertions = s.serializeArrayName(this.assertions,"assertions");
	this.options = s.serializeArrayName(this.options,"options");
	this.localData = s.serializeArrayName(this.localData,"localData");
	s.endTag();
}
com.wiris.quizzes.Question.prototype.newInstance = function() {
	return new com.wiris.quizzes.Question();
}
com.wiris.quizzes.Question.prototype.setAssertion = function(name,correctAnswer,userAnswer) {
	this.setParametrizedAssertion(name,correctAnswer,userAnswer,null);
}
com.wiris.quizzes.Question.prototype.removeAssertion = function(name,correctAnswer,userAnswer) {
	if(this.assertions != null) {
		var i = this.assertions.length - 1;
		while(i >= 0) {
			var a = this.assertions[i];
			if(a.name == name && a.correctAnswer == correctAnswer && a.answer == userAnswer) this.assertions.remove(a);
			i--;
		}
	}
}
com.wiris.quizzes.Question.prototype.setParametrizedAssertion = function(name,correctAnswer,userAnswer,parameters) {
	if(this.assertions == null) this.assertions = new Array();
	var a = new com.wiris.quizzes.Assertion();
	a.name = name;
	a.correctAnswer = correctAnswer;
	a.answer = userAnswer;
	var names = com.wiris.quizzes.Assertion.getParameterNames(name);
	if(parameters != null && names != null) {
		a.parameters = new Array();
		var n = parameters.length < names.length?parameters.length:names.length;
		var i;
		var _g = 0;
		while(_g < n) {
			var i1 = _g++;
			var ap = new com.wiris.quizzes.AssertionParam();
			ap.name = names[i1];
			ap.content = parameters[i1];
			ap.type = com.wiris.quizzes.MathContent.TYPE_TEXT;
			a.parameters.push(ap);
		}
	}
	var index = this.getAssertionIndex(name,correctAnswer,userAnswer);
	if(index == -1) this.assertions.push(a); else this.assertions[index] = a;
}
com.wiris.quizzes.Question.prototype.setOption = function(name,value) {
	if(this.options == null) this.options = new Array();
	var opt = new com.wiris.quizzes.Option();
	opt.name = name;
	opt.content = value;
	opt.type = com.wiris.quizzes.MathContent.TYPE_TEXT;
	var i;
	var found = false;
	var _g1 = 0, _g = this.options.length;
	while(_g1 < _g) {
		var i1 = _g1++;
		if(this.options[i1].name == name) {
			this.options[i1] = opt;
			found = true;
		}
	}
	if(!found) this.options.push(opt);
}
com.wiris.quizzes.Question.prototype.getOption = function(name) {
	if(this.options != null) {
		var i;
		var _g1 = 0, _g = this.options.length;
		while(_g1 < _g) {
			var i1 = _g1++;
			if(this.options[i1].name == name) return this.options[i1].content;
		}
	}
	return this.defaultOption(name);
}
com.wiris.quizzes.Question.prototype.removeOption = function(name) {
	if(this.options != null) {
		var i;
		var _g1 = 0, _g = this.options.length;
		while(_g1 < _g) {
			var i1 = _g1++;
			if(this.options[i1].name == name) this.options.remove(this.options[i1]);
		}
	}
}
com.wiris.quizzes.Question.prototype.removeLocalData = function(name) {
	if(this.localData != null) {
		var i;
		var _g1 = 0, _g = this.localData.length;
		while(_g1 < _g) {
			var i1 = _g1++;
			if(this.localData[i1].name == name) this.localData.remove(this.localData[i1]);
		}
	}
}
com.wiris.quizzes.Question.prototype.defaultOption = function(name) {
	if(name == com.wiris.quizzes.Option.OPTION_EXPONENTIAL_E) return "e"; else if(name == com.wiris.quizzes.Option.OPTION_IMAGINARY_UNIT) return "i"; else if(name == com.wiris.quizzes.Option.OPTION_IMPLICIT_TIMES_OPERATOR) return "false"; else if(name == com.wiris.quizzes.Option.OPTION_NUMBER_PI) return String.fromCharCode(960); else if(name == com.wiris.quizzes.Option.OPTION_PRECISION) return "4"; else if(name == com.wiris.quizzes.Option.OPTION_RELATIVE_TOLERANCE) return "false"; else if(name == com.wiris.quizzes.Option.OPTION_TIMES_OPERATOR) return String.fromCharCode(183); else if(name == com.wiris.quizzes.Option.OPTION_TOLERANCE) return "10^(-4)"; else return null;
}
com.wiris.quizzes.Question.prototype.setCorrectAnswer = function(index,content) {
	if(index < 0) throw "Invalid index: " + index;
	if(this.correctAnswers == null) this.correctAnswers = new Array();
	while(index >= this.correctAnswers.length) this.correctAnswers.push(new com.wiris.quizzes.CorrectAnswer());
	var ca = this.correctAnswers[index];
	ca.id = index;
	ca.weight = 1.0;
	ca.set(content);
}
com.wiris.quizzes.Question.prototype.getAssertionIndex = function(name,correctAnswer,userAnswer) {
	if(this.assertions == null) return -1;
	var i;
	var _g1 = 0, _g = this.assertions.length;
	while(_g1 < _g) {
		var i1 = _g1++;
		var a = this.assertions[i1];
		if(a.correctAnswer == correctAnswer && a.answer == userAnswer && a.name == name) return i1;
	}
	return -1;
}
com.wiris.quizzes.Question.prototype.setLocalData = function(name,value) {
	if(this.localData == null) this.localData = new Array();
	var data = new com.wiris.quizzes.LocalData();
	data.name = name;
	data.value = value;
	var i;
	var found = false;
	var _g1 = 0, _g = this.localData.length;
	while(_g1 < _g) {
		var i1 = _g1++;
		if(this.localData[i1].name == name) {
			this.localData[i1] = data;
			found = true;
		}
	}
	if(!found) this.localData.push(data);
}
com.wiris.quizzes.Question.prototype.getLocalData = function(name) {
	if(this.localData != null) {
		var i;
		var _g1 = 0, _g = this.localData.length;
		while(_g1 < _g) {
			var i1 = _g1++;
			if(this.localData[i1].name == name) return this.localData[i1].value;
		}
	}
	return this.defaultLocalData(name);
}
com.wiris.quizzes.Question.prototype.defaultLocalData = function(name) {
	if(name == com.wiris.quizzes.LocalData.KEY_OPENANSWER_COMPOUND_ANSWER) return com.wiris.quizzes.LocalData.VALUE_OPENANSWER_COMPOUND_ANSWER_FALSE; else if(name == com.wiris.quizzes.LocalData.KEY_OPENANSWER_INPUT_FIELD) return com.wiris.quizzes.LocalData.VALUE_OPENANSWER_INPUT_FIELD_INLINE_EDITOR; else if(name == com.wiris.quizzes.LocalData.KEY_SHOW_CAS) return com.wiris.quizzes.LocalData.VALUE_SHOW_CAS_FALSE; else if(name == com.wiris.quizzes.LocalData.KEY_CAS_INITIAL_SESSION) return null; else return null;
}
com.wiris.quizzes.Question.prototype.__class__ = com.wiris.quizzes.Question;
com.wiris.quizzes.Translator = function(lang,source) {
	if( lang === $_ ) return;
	this.lang = lang;
	this.strings = new Hash();
	var i;
	var _g1 = 0, _g = source.length;
	while(_g1 < _g) {
		var i1 = _g1++;
		this.strings.set(source[i1][0],source[i1][1]);
	}
}
com.wiris.quizzes.Translator.__name__ = ["com","wiris","quizzes","Translator"];
com.wiris.quizzes.Translator.languages = null;
com.wiris.quizzes.Translator.getInstance = function(lang) {
	if(com.wiris.quizzes.Translator.languages == null) com.wiris.quizzes.Translator.languages = new Hash();
	if(!com.wiris.quizzes.Translator.languages.exists(lang)) {
		var source;
		if("es" == lang) source = com.wiris.quizzes.Translator.ES; else if("en" == lang) source = com.wiris.quizzes.Translator.EN; else source = [];
		var translator = new com.wiris.quizzes.Translator(lang,source);
		com.wiris.quizzes.Translator.languages.set(lang,translator);
	}
	return com.wiris.quizzes.Translator.languages.get(lang);
}
com.wiris.quizzes.Translator.prototype.strings = null;
com.wiris.quizzes.Translator.prototype.lang = null;
com.wiris.quizzes.Translator.prototype.t = function(code) {
	if(this.strings.exists(code)) code = this.strings.get(code); else if(!("en" == this.lang)) code = com.wiris.quizzes.Translator.getInstance("en").t(code);
	return code;
}
com.wiris.quizzes.Translator.prototype.__class__ = com.wiris.quizzes.Translator;
com.wiris.quizzes.HTML = function(p) {
	if( p === $_ ) return;
	this.s = new StringBuf();
	this.tags = new Array();
}
com.wiris.quizzes.HTML.__name__ = ["com","wiris","quizzes","HTML"];
com.wiris.quizzes.HTML.prototype.s = null;
com.wiris.quizzes.HTML.prototype.tags = null;
com.wiris.quizzes.HTML.prototype.start = function(name,attributes) {
	this.s.add("<");
	this.s.add(name);
	if(attributes != null) {
		var i;
		var _g1 = 0, _g = attributes.length;
		while(_g1 < _g) {
			var i1 = _g1++;
			if(attributes[i1].length == 2 && attributes[i1][0] != null && attributes[i1][1] != null) {
				this.s.add(" ");
				this.s.add(attributes[i1][0]);
				this.s.add("=\"");
				this.s.add(com.wiris.util.xml.WXmlUtils.htmlEscape(attributes[i1][1]));
				this.s.add("\"");
			}
		}
	}
}
com.wiris.quizzes.HTML.prototype.open = function(name,attributes) {
	this.tags.push(name);
	this.start(name,attributes);
	this.s.add(">");
}
com.wiris.quizzes.HTML.prototype.openclose = function(name,attributes) {
	this.start(name,attributes);
	this.s.add("/>");
}
com.wiris.quizzes.HTML.prototype.textEm = function(text) {
	this.open("em",null);
	this.text(text);
	this.close();
}
com.wiris.quizzes.HTML.prototype.text = function(text) {
	if(text != null) this.s.add(com.wiris.util.xml.WXmlUtils.htmlEscape(text));
}
com.wiris.quizzes.HTML.prototype.close = function() {
	this.s.add("</");
	this.s.add(this.tags.pop());
	this.s.add(">");
}
com.wiris.quizzes.HTML.prototype.getString = function() {
	return this.s.b.join("");
}
com.wiris.quizzes.HTML.prototype.raw = function(raw) {
	this.s.add(raw);
}
com.wiris.quizzes.HTML.prototype.openDiv = function(id) {
	this.open("div",[["id",id]]);
}
com.wiris.quizzes.HTML.prototype.openDivClass = function(id,className) {
	this.open("div",[["id",id],["class",className]]);
}
com.wiris.quizzes.HTML.prototype.openSpan = function(id,className) {
	this.open("span",[["id",id],["class",className]]);
}
com.wiris.quizzes.HTML.prototype.js = function(code) {
	this.open("script",[["type","text/javascript"]]);
	this.text(code);
	this.close();
}
com.wiris.quizzes.HTML.prototype.input = function(type,id,name,value,title,className) {
	this.openclose("input",[["type",type],["id",id],["name",name],["value",value],["class",className]]);
}
com.wiris.quizzes.HTML.prototype.textarea = function(id,name,value,className,lang) {
	this.open("textarea",[["id",id],["name",name],["class",className],["lang",lang]]);
	this.text(value);
	this.close();
}
com.wiris.quizzes.HTML.prototype.image = function(id,src,title) {
	this.openclose("img",[["id",id],["src",src],["alt",title],["title",title]]);
}
com.wiris.quizzes.HTML.prototype.openUl = function(id,className) {
	this.open("ul",[["id",id],["class",className]]);
}
com.wiris.quizzes.HTML.prototype.li = function(content) {
	this.open("li",[]);
	this.text(content);
	this.close();
}
com.wiris.quizzes.HTML.prototype.openLi = function() {
	this.open("li",[]);
}
com.wiris.quizzes.HTML.prototype.label = function(text,id,className) {
	this.open("label",[["for",id],["class",className]]);
	this.text(text);
	this.close();
}
com.wiris.quizzes.HTML.prototype.openFieldset = function(id,legend,classes) {
	var className = "wirisfieldset";
	if(classes != null && classes.length > 0) className += " " + classes;
	this.open("fieldset",[["id",id],["class",className]]);
	this.open("legend",[["class",classes]]);
	this.text(legend);
	this.close();
}
com.wiris.quizzes.HTML.prototype.select = function(id,name,options) {
	this.open("select",[["id",id],["name",name]]);
	var i;
	var _g1 = 0, _g = options.length;
	while(_g1 < _g) {
		var i1 = _g1++;
		this.open("option",[["value",options[i1][0]]]);
		this.text(options[i1][1]);
		this.close();
	}
	this.close();
}
com.wiris.quizzes.HTML.prototype.openA = function(id,href,className) {
	this.open("a",[["id",id],["href",href],["class",className]]);
}
com.wiris.quizzes.HTML.prototype.openStrong = function() {
	this.open("strong",null);
}
com.wiris.quizzes.HTML.prototype.help = function(id,href,title) {
	this.openSpan(id + "span","wirishelp");
	this.open("a",[["id",id],["href",href],["class","wirishelp"],["title",title],["target","_blank"]]);
	this.close();
	this.close();
}
com.wiris.quizzes.HTML.prototype.openP = function() {
	this.open("p",null);
}
com.wiris.quizzes.HTML.prototype.formatText = function(text) {
	var ps = text.split("\n");
	var i;
	var _g1 = 0, _g = ps.length;
	while(_g1 < _g) {
		var i1 = _g1++;
		this.openP();
		this.text(ps[i1]);
		this.close();
	}
}
com.wiris.quizzes.HTML.prototype.__class__ = com.wiris.quizzes.HTML;
haxe.io.Output = function() { }
haxe.io.Output.__name__ = ["haxe","io","Output"];
haxe.io.Output.prototype.bigEndian = null;
haxe.io.Output.prototype.writeByte = function(c) {
	throw "Not implemented";
}
haxe.io.Output.prototype.writeBytes = function(s,pos,len) {
	var k = len;
	var b = s.b;
	if(pos < 0 || len < 0 || pos + len > s.length) throw haxe.io.Error.OutsideBounds;
	while(k > 0) {
		this.writeByte(b[pos]);
		pos++;
		k--;
	}
	return len;
}
haxe.io.Output.prototype.flush = function() {
}
haxe.io.Output.prototype.close = function() {
}
haxe.io.Output.prototype.setEndian = function(b) {
	this.bigEndian = b;
	return b;
}
haxe.io.Output.prototype.write = function(s) {
	var l = s.length;
	var p = 0;
	while(l > 0) {
		var k = this.writeBytes(s,p,l);
		if(k == 0) throw haxe.io.Error.Blocked;
		p += k;
		l -= k;
	}
}
haxe.io.Output.prototype.writeFullBytes = function(s,pos,len) {
	while(len > 0) {
		var k = this.writeBytes(s,pos,len);
		pos += k;
		len -= k;
	}
}
haxe.io.Output.prototype.writeFloat = function(x) {
	throw "Not implemented";
}
haxe.io.Output.prototype.writeDouble = function(x) {
	throw "Not implemented";
}
haxe.io.Output.prototype.writeInt8 = function(x) {
	if(x < -128 || x >= 128) throw haxe.io.Error.Overflow;
	this.writeByte(x & 255);
}
haxe.io.Output.prototype.writeInt16 = function(x) {
	if(x < -32768 || x >= 32768) throw haxe.io.Error.Overflow;
	this.writeUInt16(x & 65535);
}
haxe.io.Output.prototype.writeUInt16 = function(x) {
	if(x < 0 || x >= 65536) throw haxe.io.Error.Overflow;
	if(this.bigEndian) {
		this.writeByte(x >> 8);
		this.writeByte(x & 255);
	} else {
		this.writeByte(x & 255);
		this.writeByte(x >> 8);
	}
}
haxe.io.Output.prototype.writeInt24 = function(x) {
	if(x < -8388608 || x >= 8388608) throw haxe.io.Error.Overflow;
	this.writeUInt24(x & 16777215);
}
haxe.io.Output.prototype.writeUInt24 = function(x) {
	if(x < 0 || x >= 16777216) throw haxe.io.Error.Overflow;
	if(this.bigEndian) {
		this.writeByte(x >> 16);
		this.writeByte(x >> 8 & 255);
		this.writeByte(x & 255);
	} else {
		this.writeByte(x & 255);
		this.writeByte(x >> 8 & 255);
		this.writeByte(x >> 16);
	}
}
haxe.io.Output.prototype.writeInt31 = function(x) {
	if(x < -1073741824 || x >= 1073741824) throw haxe.io.Error.Overflow;
	if(this.bigEndian) {
		this.writeByte(x >>> 24);
		this.writeByte(x >> 16 & 255);
		this.writeByte(x >> 8 & 255);
		this.writeByte(x & 255);
	} else {
		this.writeByte(x & 255);
		this.writeByte(x >> 8 & 255);
		this.writeByte(x >> 16 & 255);
		this.writeByte(x >>> 24);
	}
}
haxe.io.Output.prototype.writeUInt30 = function(x) {
	if(x < 0 || x >= 1073741824) throw haxe.io.Error.Overflow;
	if(this.bigEndian) {
		this.writeByte(x >>> 24);
		this.writeByte(x >> 16 & 255);
		this.writeByte(x >> 8 & 255);
		this.writeByte(x & 255);
	} else {
		this.writeByte(x & 255);
		this.writeByte(x >> 8 & 255);
		this.writeByte(x >> 16 & 255);
		this.writeByte(x >>> 24);
	}
}
haxe.io.Output.prototype.writeInt32 = function(x) {
	if(this.bigEndian) {
		this.writeByte(haxe.Int32.toInt(x >>> 24));
		this.writeByte(haxe.Int32.toInt(x >>> 16) & 255);
		this.writeByte(haxe.Int32.toInt(x >>> 8) & 255);
		this.writeByte(haxe.Int32.toInt(x & (255 | 0)));
	} else {
		this.writeByte(haxe.Int32.toInt(x & (255 | 0)));
		this.writeByte(haxe.Int32.toInt(x >>> 8) & 255);
		this.writeByte(haxe.Int32.toInt(x >>> 16) & 255);
		this.writeByte(haxe.Int32.toInt(x >>> 24));
	}
}
haxe.io.Output.prototype.prepare = function(nbytes) {
}
haxe.io.Output.prototype.writeInput = function(i,bufsize) {
	if(bufsize == null) bufsize = 4096;
	var buf = haxe.io.Bytes.alloc(bufsize);
	try {
		while(true) {
			var len = i.readBytes(buf,0,bufsize);
			if(len == 0) throw haxe.io.Error.Blocked;
			var p = 0;
			while(len > 0) {
				var k = this.writeBytes(buf,p,len);
				if(k == 0) throw haxe.io.Error.Blocked;
				p += k;
				len -= k;
			}
		}
	} catch( e ) {
		if( js.Boot.__instanceof(e,haxe.io.Eof) ) {
		} else throw(e);
	}
}
haxe.io.Output.prototype.writeString = function(s) {
	var b = haxe.io.Bytes.ofString(s);
	this.writeFullBytes(b,0,b.length);
}
haxe.io.Output.prototype.__class__ = haxe.io.Output;
com.wiris.quizzes.ResultErrorLocation = function(p) {
	if( p === $_ ) return;
	com.wiris.quizzes.Serializable.call(this);
	this.fromline = -1;
	this.toline = -1;
	this.fromcolumn = -1;
	this.tocolumn = -1;
}
com.wiris.quizzes.ResultErrorLocation.__name__ = ["com","wiris","quizzes","ResultErrorLocation"];
com.wiris.quizzes.ResultErrorLocation.__super__ = com.wiris.quizzes.Serializable;
for(var k in com.wiris.quizzes.Serializable.prototype ) com.wiris.quizzes.ResultErrorLocation.prototype[k] = com.wiris.quizzes.Serializable.prototype[k];
com.wiris.quizzes.ResultErrorLocation.prototype.element = null;
com.wiris.quizzes.ResultErrorLocation.prototype.elementid = null;
com.wiris.quizzes.ResultErrorLocation.prototype.fromline = null;
com.wiris.quizzes.ResultErrorLocation.prototype.toline = null;
com.wiris.quizzes.ResultErrorLocation.prototype.fromcolumn = null;
com.wiris.quizzes.ResultErrorLocation.prototype.tocolumn = null;
com.wiris.quizzes.ResultErrorLocation.prototype.newInstance = function() {
	return new com.wiris.quizzes.ResultErrorLocation();
}
com.wiris.quizzes.ResultErrorLocation.prototype.onSerialize = function(s) {
	s.beginTag(com.wiris.quizzes.ResultErrorLocation.tagName);
	this.element = s.attributeString("element",this.element,null);
	this.elementid = s.attributeString("ref",this.elementid,null);
	this.fromline = s.attributeInt("fromline",this.fromline,-1);
	this.toline = s.attributeInt("toline",this.toline,-1);
	this.fromcolumn = s.attributeInt("fromcolumn",this.fromcolumn,-1);
	this.tocolumn = s.attributeInt("tocolumn",this.tocolumn,-1);
	s.endTag();
}
com.wiris.quizzes.ResultErrorLocation.prototype.__class__ = com.wiris.quizzes.ResultErrorLocation;
com.wiris.quizzes.HTMLTools = function(p) {
}
com.wiris.quizzes.HTMLTools.__name__ = ["com","wiris","quizzes","HTMLTools"];
com.wiris.quizzes.HTMLTools.base64 = null;
com.wiris.quizzes.HTMLTools.compareStrings = function(a,b) {
	var i;
	var n = a.length > b.length?b.length:a.length;
	var _g = 0;
	while(_g < n) {
		var i1 = _g++;
		var c = a.charCodeAt(i1) - b.charCodeAt(i1);
		if(c != 0) return c;
	}
	return a.length - b.length;
}
com.wiris.quizzes.HTMLTools.isDigit = function(c) {
	if(48 <= c && c <= 57) return true;
	if(1632 <= c && c <= 1641) return true;
	if(1776 <= c && c <= 1785) return true;
	return false;
}
com.wiris.quizzes.HTMLTools.isLetter = function(c) {
	if(com.wiris.quizzes.HTMLTools.isDigit(c)) return false;
	if(65 <= c && c <= 90) return true;
	if(97 <= c && c <= 122) return true;
	if(192 <= c && c <= 696 && c != 215 && c != 247) return true;
	if(867 <= c && c <= 1521) return true;
	if(1552 <= c && c <= 8188) return true;
	if(c == 8450 || c == 8461 || c == 8469 || c == 8473 || c == 8474 || c == 8477 || c == 8484) return true;
	if(c >= 13312 && c <= 40959) return true;
	return false;
}
com.wiris.quizzes.HTMLTools.main = function() {
	var h = new com.wiris.quizzes.HTMLTools();
	h.unitTest();
}
com.wiris.quizzes.HTMLTools.prototype.extractVariableNames = function(html) {
	if(this.isMathMLEncoded(html)) html = this.decodeMathML(html);
	html = this.prepareFormulas(html);
	var names = new Array();
	var start = 0;
	while((start = html.indexOf("#",start)) != -1) {
		var name = this.getVariableName(html,start);
		if(name != null) {
			var i = 0;
			while(i < names.length) {
				if(com.wiris.quizzes.HTMLTools.compareStrings(names[i],name) >= 0) break;
				i++;
			}
			if(i < names.length) {
				if(!(names[i] == name)) names.insert(i,name);
			} else names.push(name);
		}
		start++;
	}
	var result = new Array();
	var k;
	var _g1 = 0, _g = names.length;
	while(_g1 < _g) {
		var k1 = _g1++;
		result[k1] = names[k1];
	}
	return result;
}
com.wiris.quizzes.HTMLTools.prototype.isMathMLEncoded = function(html) {
	var opentag = String.fromCharCode(171);
	return html.indexOf(opentag + "math") != -1;
}
com.wiris.quizzes.HTMLTools.prototype.decodeMathML = function(html) {
	var opentag = "«";
	var closetag = "»";
	var quote = "¨";
	var amp = "§";
	var closemath = opentag + "/math" + closetag;
	var start;
	var end = 0;
	while((start = html.indexOf(opentag + "math",end)) != -1) {
		end = html.indexOf(closemath,start) + closemath.length;
		var formula = html.substr(start,end - start);
		formula = com.wiris.util.xml.WXmlUtils.htmlUnescape(formula);
		formula = StringTools.replace(formula,opentag,"<");
		formula = StringTools.replace(formula,closetag,">");
		formula = StringTools.replace(formula,quote,"\"");
		formula = StringTools.replace(formula,amp,"&");
		html = html.substr(0,start) + formula + html.substr(end);
		end = start + formula.length;
	}
	return html;
}
com.wiris.quizzes.HTMLTools.prototype.encodeMathML = function(html) {
	var opentag = "«";
	var closetag = "»";
	var quote = "¨";
	var amp = "§";
	var start;
	var end = 0;
	while((start = html.indexOf("<math",end)) != -1) {
		var closemath = "</math>";
		end = html.indexOf(closemath,start) + closemath.length;
		var formula = html.substr(start,end - start);
		formula = StringTools.replace(formula,"<",opentag);
		formula = StringTools.replace(formula,">",closetag);
		formula = StringTools.replace(formula,"\"",quote);
		formula = StringTools.replace(formula,"&",amp);
		html = html.substr(0,start) + formula + html.substr(end);
		end = start + formula.length;
	}
	return html;
}
com.wiris.quizzes.HTMLTools.prototype.expandVariables = function(html,variables) {
	if(variables == null || html.indexOf("#") == -1) return html;
	var encoded = this.isMathMLEncoded(html);
	if(encoded) html = this.decodeMathML(html);
	html = this.prepareFormulas(html);
	var tokens = this.splitHTMLbyMathML(html);
	var sb = new StringBuf();
	var i;
	var _g1 = 0, _g = tokens.length;
	while(_g1 < _g) {
		var i1 = _g1++;
		var token = tokens[i1];
		var v;
		if(StringTools.startsWith(token,"<math")) {
			v = variables.get(com.wiris.quizzes.MathContent.TYPE_MATHML);
			if(v != null) token = this.replaceMathMLVariablesInsideMathML(token,v);
		} else {
			v = variables.get(com.wiris.quizzes.MathContent.TYPE_IMAGE);
			if(v != null) token = this.replaceVariablesInsideHTML(token,v,com.wiris.quizzes.MathContent.TYPE_IMAGE);
			v = variables.get(com.wiris.quizzes.MathContent.TYPE_MATHML);
			if(v != null) token = this.replaceVariablesInsideHTML(token,v,com.wiris.quizzes.MathContent.TYPE_MATHML);
			v = variables.get(com.wiris.quizzes.MathContent.TYPE_TEXT);
			if(v != null) token = this.replaceVariablesInsideHTML(token,variables.get(com.wiris.quizzes.MathContent.TYPE_TEXT),com.wiris.quizzes.MathContent.TYPE_TEXT);
		}
		sb.b[sb.b.length] = token == null?"null":token;
	}
	var result = sb.b.join("");
	if(encoded) result = this.encodeMathML(result);
	return result;
}
com.wiris.quizzes.HTMLTools.prototype.splitHTMLbyMathML = function(html) {
	var tokens = new Array();
	var start = 0;
	var end = 0;
	while((start = html.indexOf("<math",end)) != -1) {
		if(start - end > 0) tokens.push(html.substr(end,start - end));
		var firstClose = html.indexOf(">",start);
		if(firstClose != -1 && html.substr(firstClose - 1,1) == "/") end = firstClose + 1; else end = html.indexOf("</math>",start) + "</math>".length;
		tokens.push(html.substr(start,end - start));
	}
	if(end < html.length) tokens.push(html.substr(end));
	return tokens;
}
com.wiris.quizzes.HTMLTools.prototype.replaceMathMLVariablesInsideMathML = function(formula,variables) {
	var keys = this.sortIterator(variables.keys());
	var j = keys.length - 1;
	while(j >= 0) {
		var name = keys[j];
		var placeholder = this.getPlaceHolder(name);
		var pos;
		while((pos = formula.indexOf(placeholder)) != -1) {
			var value = this.toSubFormula(variables.get(name));
			var splittag = false;
			var formula1 = formula.substr(0,pos);
			var formula2 = formula.substr(pos + placeholder.length);
			var openTag1 = formula1.lastIndexOf("<");
			var closeTag1 = formula1.lastIndexOf(">");
			var openTag2 = formula2.indexOf("<");
			var closeTag2 = formula2.indexOf(">");
			var after = "";
			var before = "";
			if(closeTag1 + 1 < formula1.length) {
				splittag = true;
				var closeTag = formula2.substr(openTag2,closeTag2 - openTag2 + 1);
				before = formula1.substr(openTag1) + closeTag;
			}
			if(openTag2 > 0) {
				splittag = true;
				var openTag = formula1.substr(openTag1,closeTag1 - openTag1 + 1);
				after = openTag + formula2.substr(0,openTag2 + 1);
			}
			formula1 = formula1.substr(0,openTag1);
			formula2 = formula2.substr(closeTag2 + 1);
			if(splittag) formula = formula1 + "<mrow>" + before + value + after + "</mrow>" + formula2; else formula = formula1 + value + formula2;
		}
		j--;
	}
	return formula;
}
com.wiris.quizzes.HTMLTools.prototype.replaceVariablesInsideHTML = function(token,variables,type) {
	var keys = this.sortIterator(variables.keys());
	var j = keys.length - 1;
	while(j >= 0) {
		var name = keys[j];
		var placeholder = this.getPlaceHolder(name);
		var pos = 0;
		while((pos = token.indexOf(placeholder,pos)) != -1) {
			if((!(type == com.wiris.quizzes.MathContent.TYPE_MATHML) || !this.insideTag(token,pos)) && name == this.getVariableName(token,pos)) {
				var value = variables.get(name);
				if(type == com.wiris.quizzes.MathContent.TYPE_TEXT) value = com.wiris.util.xml.WXmlUtils.htmlEscape(value); else if(type == com.wiris.quizzes.MathContent.TYPE_MATHML) {
					value = this.addMathTag(value);
					value = this.extractTextFromMathML(value);
				} else if(type == com.wiris.quizzes.MathContent.TYPE_IMAGE) value = this.addImageTag(value);
				token = token.substr(0,pos) + value + token.substr(pos + placeholder.length);
			}
			pos++;
		}
		j--;
	}
	return token;
}
com.wiris.quizzes.HTMLTools.prototype.getVariableName = function(html,pos) {
	var name = null;
	if(html.charCodeAt(pos) == 35) {
		var end = pos + 1;
		if(end < html.length) {
			var c = html.charCodeAt(end);
			if(this.isQuizzesIdentifierStart(c)) {
				end++;
				while(end < html.length && this.isQuizzesIdentifierPart(html.charCodeAt(end))) end++;
				name = html.substr(pos + 1,end - (pos + 1));
			}
		}
	}
	return name;
}
com.wiris.quizzes.HTMLTools.prototype.isQuizzesIdentifierStart = function(c) {
	return c >= 97 && c <= 122 || c >= 65 && c <= 90 || c == 95;
}
com.wiris.quizzes.HTMLTools.prototype.isQuizzesIdentifierPart = function(c) {
	return c >= 97 && c <= 122 || c >= 65 && c <= 90 || c == 95 || c >= 48 && c <= 57;
}
com.wiris.quizzes.HTMLTools.prototype.insideTag = function(html,pos) {
	var beginTag = html.lastIndexOf("<",pos);
	var endTag = html.lastIndexOf(">",pos);
	return beginTag != -1 && endTag == -1 || beginTag > endTag;
}
com.wiris.quizzes.HTMLTools.prototype.getPlaceHolder = function(name) {
	return "#" + name;
}
com.wiris.quizzes.HTMLTools.prototype.sortIterator = function(it) {
	var sorted = new Array();
	while(it.hasNext()) {
		var a = it.next();
		var j = 0;
		var _g1 = 0, _g = sorted.length;
		while(_g1 < _g) {
			var j1 = _g1++;
			if(com.wiris.quizzes.HTMLTools.compareStrings(sorted[j1],a) > 0) break;
		}
		sorted.insert(j,a);
	}
	return sorted;
}
com.wiris.quizzes.HTMLTools.prototype.prepareFormulas = function(text) {
	var start = 0;
	while((start = text.indexOf("<math",start)) != -1) {
		var length = text.indexOf("</math>",start) - start + "</math>".length;
		var formula = text.substr(start,length);
		var pos = 0;
		while((pos = formula.indexOf("#",pos)) != -1) {
			var initag = pos;
			while(initag >= 0 && formula.charCodeAt(initag) != 60) initag--;
			var parentpos = initag;
			var parenttag = null;
			var parenttagname = null;
			while(parenttag == null) {
				while(formula.charCodeAt(parentpos - 2) == 47 && formula.charCodeAt(parentpos - 1) == 62) while(parentpos >= 0 && formula.charCodeAt(parentpos) != 60) parentpos--;
				parentpos--;
				while(parentpos >= 0 && formula.charCodeAt(parentpos) != 60) parentpos--;
				if(formula.charCodeAt(parentpos) == 60 && formula.charCodeAt(parentpos + 1) == 47) {
					var namepos = parentpos + "</".length;
					var character = formula.charCodeAt(namepos);
					var nameBuf = new StringBuf();
					while(this.isQuizzesIdentifierPart(character)) {
						nameBuf.b[nameBuf.b.length] = String.fromCharCode(character);
						namepos++;
						character = formula.charCodeAt(namepos);
					}
					var name = nameBuf.b.join("");
					var depth = 1;
					var namelength = name.length;
					while(depth > 0 && parentpos >= 0) {
						var currentTagName = formula.substr(parentpos,namelength);
						if(name == currentTagName) {
							var currentStartTag = formula.substr(parentpos - "<".length,namelength + "<".length);
							if("<" + name == currentStartTag && formula.indexOf(">",parentpos) < formula.indexOf("/",parentpos)) depth--; else {
								var currentOpenCloseTag = formula.substr(parentpos - "</".length,namelength + "</".length);
								if("</" + name == currentOpenCloseTag) depth++;
							}
						}
						if(depth > 0) parentpos--; else parentpos -= "<".length;
					}
					if(depth > 0) return text;
				} else {
					parenttag = formula.substr(parentpos,formula.indexOf(">",parentpos) - parentpos + 1);
					parenttagname = parenttag.substr(1,parenttag.length - 2);
					if(parenttagname.indexOf(" ") != -1) parenttagname = parenttagname.substr(0,parenttagname.indexOf(" "));
				}
			}
			var allowedparenttags = ["mrow","mtd","math","msqrt","mstyle","merror","mpadded","mphantom","menclose"];
			if(this.inArray(parenttagname,allowedparenttags)) {
				var firstchar = true;
				var appendpos = pos + 1;
				var character = formula.charCodeAt(appendpos);
				while(this.isQuizzesIdentifierStart(character) || this.isQuizzesIdentifierPart(character) && !firstchar) {
					appendpos++;
					character = formula.charCodeAt(appendpos);
					firstchar = false;
				}
				if(formula.charCodeAt(appendpos) != 60) {
					pos++;
					continue;
				}
				var nextpos = formula.indexOf(">",pos);
				var end = false;
				while(!end && nextpos != -1 && pos + ">".length < formula.length) {
					nextpos += ">".length;
					var nexttaglength = formula.indexOf(">",nextpos) - nextpos + ">".length;
					var nexttag = formula.substr(nextpos,nexttaglength);
					var nexttagname = nexttag.substr(1,nexttag.length - 2);
					if(nexttagname.indexOf(" ") != -1) nexttagname = nexttagname.substr(0,nexttagname.indexOf(" "));
					var specialtag = null;
					var speciallength = 0;
					if(nexttagname == "msup" || nexttagname == "msub" || nexttagname == "msubsup") {
						specialtag = nexttag;
						speciallength = nexttaglength;
						nextpos = nextpos + nexttaglength;
						nexttaglength = formula.indexOf(">",nextpos) - nextpos + ">".length;
						nexttag = formula.substr(nextpos,nexttaglength);
						nexttagname = nexttag.substr(1,nexttag.length - 2);
						if(nexttagname.indexOf(" ") != -1) nexttagname = nexttagname.substr(0,nexttagname.indexOf(" "));
					}
					if(nexttagname == "mi" || nexttagname == "mn") {
						var contentpos = nextpos + nexttaglength;
						var toappend = new StringBuf();
						character = formula.charCodeAt(contentpos);
						while(this.isQuizzesIdentifierStart(character) || this.isQuizzesIdentifierPart(character) && !firstchar) {
							contentpos++;
							toappend.b[toappend.b.length] = String.fromCharCode(character);
							character = formula.charCodeAt(contentpos);
							firstchar = false;
						}
						var toAppendStr = toappend.b.join("");
						var nextclosepos = formula.indexOf("<",contentpos);
						var nextcloseend = formula.indexOf(">",nextclosepos) + ">".length;
						if(toAppendStr.length == 0) end = true; else if(nextclosepos != contentpos) {
							var content = formula.substr(contentpos,nextclosepos - contentpos);
							var nextclosetag = formula.substr(nextclosepos,nextcloseend - nextclosepos);
							var newnexttag = nexttag + content + nextclosetag;
							formula = formula.substr(0,nextpos) + newnexttag + formula.substr(nextcloseend);
							formula = formula.substr(0,appendpos) + toAppendStr + formula.substr(appendpos);
							end = true;
						} else {
							formula = formula.substr(0,nextpos) + formula.substr(nextcloseend);
							formula = formula.substr(0,appendpos) + toAppendStr + formula.substr(appendpos);
							if(specialtag != null) {
								var fulltaglength = formula.indexOf(">",appendpos) + ">".length - initag;
								formula = formula.substr(0,initag) + specialtag + formula.substr(initag,fulltaglength) + formula.substr(initag + fulltaglength + speciallength);
								end = true;
							}
						}
						appendpos += toAppendStr.length;
					} else end = true;
					if(!end) nextpos = formula.indexOf(">",pos);
				}
			}
			pos++;
		}
		text = text.substr(0,start) + formula + text.substr(start + length);
		start = start + formula.length;
	}
	return text;
}
com.wiris.quizzes.HTMLTools.prototype.inArray = function(value,array) {
	var i;
	var _g1 = 0, _g = array.length;
	while(_g1 < _g) {
		var i1 = _g1++;
		if(array[i1] == value) return true;
	}
	return false;
}
com.wiris.quizzes.HTMLTools.prototype.addMathTag = function(mathml) {
	if(!StringTools.startsWith(mathml,"<math")) mathml = "<math xmlns=\"http://www.w3.org/1998/Math/MathML\">" + mathml + "</math>";
	return mathml;
}
com.wiris.quizzes.HTMLTools.prototype.stripMathTag = function(mathml) {
	mathml = StringTools.trim(mathml);
	if(StringTools.startsWith(mathml,"<math")) {
		mathml = mathml.substr(mathml.indexOf(">") + 1);
		mathml = mathml.substr(0,mathml.lastIndexOf("<"));
	}
	return mathml;
}
com.wiris.quizzes.HTMLTools.prototype.toSubFormula = function(mathml) {
	mathml = this.stripMathTag(mathml);
	return "<mrow>" + mathml + "</mrow>";
}
com.wiris.quizzes.HTMLTools.prototype.isReservedWord = function(word) {
	var reservedWords = ["sin","cos","tan","log","ln"];
	return this.inArray(word,reservedWords);
}
com.wiris.quizzes.HTMLTools.prototype.textToMathML = function(text) {
	var mathml = new StringBuf();
	var token;
	var n = text.length;
	var i = 0;
	while(i < n) {
		var c = text.charCodeAt(i);
		if(c == 32) {
			i++;
			if(i < n) c = text.charCodeAt(i);
		} else if(com.wiris.quizzes.HTMLTools.isDigit(c)) {
			token = new StringBuf();
			while(i < n && com.wiris.quizzes.HTMLTools.isDigit(c)) {
				token.b[token.b.length] = String.fromCharCode(c);
				i++;
				if(i < n) c = text.charCodeAt(i);
			}
			mathml.b[mathml.b.length] = "<mn>" == null?"null":"<mn>";
			mathml.add(token.b.join(""));
			mathml.b[mathml.b.length] = "</mn>" == null?"null":"</mn>";
		} else if(com.wiris.quizzes.HTMLTools.isLetter(c)) {
			token = new StringBuf();
			while(i < n && com.wiris.quizzes.HTMLTools.isLetter(c)) {
				token.add(String.fromCharCode(c));
				i++;
				if(i < n) c = text.charCodeAt(i);
			}
			var tok = token.b.join("");
			var tokens;
			if(this.isReservedWord(tok)) tokens = [tok]; else {
				var m = tok.length;
				tokens = new Array();
				var j;
				var _g = 0;
				while(_g < m) {
					var j1 = _g++;
					tokens[j1] = String.fromCharCode(tok.charCodeAt(j1));
				}
			}
			var k;
			var _g1 = 0, _g = tokens.length;
			while(_g1 < _g) {
				var k1 = _g1++;
				mathml.b[mathml.b.length] = "<mi>" == null?"null":"<mi>";
				mathml.add(tokens[k1]);
				mathml.b[mathml.b.length] = "</mi>" == null?"null":"</mi>";
			}
		} else {
			mathml.b[mathml.b.length] = "<mo>" == null?"null":"<mo>";
			mathml.add(String.fromCharCode(c));
			mathml.b[mathml.b.length] = "</mo>" == null?"null":"</mo>";
			i++;
			if(i < n) c = text.charCodeAt(i);
		}
	}
	var result = this.addMathTag(mathml.b.join(""));
	return result;
}
com.wiris.quizzes.HTMLTools.prototype.isTokensMathML = function(mathml) {
	mathml = this.stripMathTag(mathml);
	var allowedTags = ["mrow","mn","mi","mo"];
	var start = 0;
	while((start = mathml.indexOf("<",start)) != -1) {
		var sb = new StringBuf();
		start++;
		var c = mathml.charCodeAt(start);
		if(c == 47) continue;
		while(c != 32 && c != 47 && c != 62) {
			sb.b[sb.b.length] = String.fromCharCode(c);
			start++;
			c = mathml.charCodeAt(start);
		}
		if(c == 32 && c == 47) return false;
		var tagname = sb.b.join("");
		if(!this.inArray(tagname,allowedTags)) return false;
		if(tagname == "mo") {
			start++;
			var end = mathml.indexOf("<",start);
			var content = mathml.substr(start,end - start);
			if(!(content == "#")) return false;
		}
	}
	return true;
}
com.wiris.quizzes.HTMLTools.prototype.mathMLToText = function(mathml) {
	var text = new StringBuf();
	mathml = this.stripMathTag(mathml);
	var tags = ["mi","mo","mn"];
	var start = 0;
	var lastMi = false;
	var lastReserved = false;
	while((start = mathml.indexOf("<",start)) != -1) {
		start++;
		var end = mathml.indexOf(">",start);
		if(end == -1) break;
		var tag = mathml.substr(start,end - start);
		var space;
		if((space = tag.indexOf(" ")) != -1) tag = tag.substr(0,space);
		if(!this.inArray(tag,tags)) continue;
		start = end + 1;
		end = mathml.indexOf("<",start);
		if(end - start <= 0) continue;
		var content = mathml.substr(start,end - start);
		var mi = tag == "mi";
		var reserved = mi && this.isReservedWord(content);
		if(mi && lastReserved || lastMi && reserved) text.b[text.b.length] = " " == null?"null":" ";
		text.b[text.b.length] = content == null?"null":content;
		lastMi = mi;
		lastReserved = reserved;
	}
	return text.b.join("");
}
com.wiris.quizzes.HTMLTools.prototype.addImageTag = function(value) {
	var base64 = this.getBase64Code();
	value = StringTools.replace(value,"=","");
	var b = base64.decodeBytes(haxe.io.Bytes.ofString(value));
	var filename = haxe.Md5.encode(value);
	var path = com.wiris.quizzes.QuizzesConfig.QUIZZES_CACHE_PATH + "/" + filename + ".png";
	var s = com.wiris.system.Storage.newStorage(path);
	if(!s.exists()) s.writeBinary(b.b);
	var url = com.wiris.quizzes.QuizzesConfig.QUIZZES_PROXY_URL + "?service=cache&name=" + filename + ".png";
	var h = new com.wiris.quizzes.HTML();
	h.image(filename,url,null);
	return h.getString();
}
com.wiris.quizzes.HTMLTools.prototype.getBase64Code = function() {
	if(com.wiris.quizzes.HTMLTools.base64 == null) com.wiris.quizzes.HTMLTools.base64 = new haxe.BaseCode(haxe.io.Bytes.ofString("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"));
	return com.wiris.quizzes.HTMLTools.base64;
}
com.wiris.quizzes.HTMLTools.prototype.extractTextFromMathML = function(formula) {
	if(formula.indexOf("<mtext") == -1) return formula;
	var allowedTags = ["math","mrow"];
	var stack = new Array();
	var omittedcontent = false;
	var lasttag = null;
	var beginformula = formula.indexOf("<");
	var start;
	var end = 0;
	while(end < formula.length && (start = formula.indexOf("<",end)) != -1) {
		end = formula.indexOf(">",start);
		var tag = formula.substr(start,end - start + 1);
		var trimmedTag = formula.substr(start + 1,end - start - 1);
		if(trimmedTag.substr(trimmedTag.length - 1) == "/") continue;
		var spacepos = tag.indexOf(" ");
		if(spacepos != -1) trimmedTag = tag.substr(1,spacepos - 1);
		if(this.inArray(trimmedTag,allowedTags)) {
			stack.push([trimmedTag,tag]);
			lasttag = trimmedTag;
		} else if(trimmedTag == "/" + lasttag) {
			stack.pop();
			if(stack.length > 0) {
				var lastpair = stack[stack.length - 1];
				lasttag = lastpair[0];
			} else lasttag = null;
			if(stack.length == 0 && !omittedcontent) {
				var formula1 = formula.substr(0,beginformula);
				if(end < formula.length - 1) {
					var formula2 = formula.substr(end + 1);
					formula = formula1 + formula2;
				} else formula = formula1;
			}
		} else if(trimmedTag == "mtext") {
			var pos2 = formula.indexOf("</mtext>",start);
			var text = formula.substr(start + 7,pos2 - start - 7);
			text = StringTools.replace(text,"&centerdot;","&middot;");
			text = StringTools.replace(text,"&apos;","&#39;");
			var formula1 = formula.substr(0,start);
			var formula2 = formula.substr(pos2 + 8);
			if(omittedcontent) {
				var tail1 = "";
				var head2 = "";
				var i = stack.length - 1;
				while(i >= 0) {
					var pair = stack[i];
					tail1 = tail1 + "</" + pair[0] + ">";
					head2 = pair[1] + head2;
					i--;
				}
				formula1 = formula1 + tail1;
				formula2 = head2 + formula2;
				if(com.wiris.quizzes.MathContent.isEmpty(formula2)) formula2 = "";
				formula = formula1 + text + formula2;
				beginformula = start + tail1.length + text.length;
				end = beginformula + head2.length;
			} else {
				var head = formula1.substr(0,beginformula);
				var head2 = formula1.substr(beginformula);
				formula2 = head2 + formula2;
				if(com.wiris.quizzes.MathContent.isEmpty(formula2)) formula2 = "";
				formula = head + text + formula2;
				beginformula += text.length;
				end = beginformula + formula1.length;
			}
			omittedcontent = false;
		} else {
			var num = 1;
			var pos = start + tag.length;
			while(num > 0) {
				end = formula.indexOf("</" + trimmedTag + ">",pos);
				var mid = formula.indexOf("<" + trimmedTag,pos);
				if(end == -1) return formula; else if(mid == -1 || end < mid) {
					num--;
					pos = end + ("</" + trimmedTag + ">").length;
				} else {
					pos = mid + ("<" + trimmedTag).length;
					num++;
				}
			}
			end += ("</" + trimmedTag + ">").length;
			omittedcontent = true;
		}
	}
	return formula;
}
com.wiris.quizzes.HTMLTools.prototype.unitTestPrepareFormulasAlgorithm = function() {
	var tests = ["<math xmlns=\"http://www.w3.org/1998/Math/MathML\"><mo>#</mo><mi>a</mi><mo>&#160;</mo><mo>+</mo><mo>#</mo><mi>b</mi></math>","<math xmlns=\"http://www.w3.org/1998/Math/MathML\"><mi>p</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>=</mo><mi>#</mi><mi>p</mi></math>","<math><mrow><mi>#</mi><mi>f</mi></mrow></math>","<math><mrow><mi>#</mi><msup><mi>f</mi><mn>2</mn></msup></mrow></math>","<math><mrow><msqrt><mrow><mn>2</mn><msqrt><mn>3</mn></msqrt></mrow></msqrt><mi>#</mi><mi>a</mi></mrow></math>","<math><mrow><msub><mi>#</mi><mi>a</mi></msub></mrow></math>","<math><mrow><mi>#</mi><msub><mi>a</mi><mi>c</mi></msub></mrow></math>","<math><mrow><msqrt><mrow><mi>#</mi><mi>f</mi><mi>u</mi><mi>n</mi><mi>c</mi></mrow></msqrt></mrow></math>","<math xmlns=\"http://www.w3.org/1998/Math/MathML\"><mo>&#8594;</mo><mn>0</mn></math>"];
	var responses = ["<math xmlns=\"http://www.w3.org/1998/Math/MathML\"><mo>#a</mo><mo>&#160;</mo><mo>+</mo><mo>#b</mo></math>","<math xmlns=\"http://www.w3.org/1998/Math/MathML\"><mi>p</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>=</mo><mi>#p</mi></math>","<math><mrow><mi>#f</mi></mrow></math>","<math><mrow><msup><mi>#f</mi><mn>2</mn></msup></mrow></math>","<math><mrow><msqrt><mrow><mn>2</mn><msqrt><mn>3</mn></msqrt></mrow></msqrt><mi>#a</mi></mrow></math>","<math><mrow><msub><mi>#</mi><mi>a</mi></msub></mrow></math>","<math><mrow><msub><mi>#a</mi><mi>c</mi></msub></mrow></math>","<math><mrow><msqrt><mrow><mi>#func</mi></mrow></msqrt></mrow></math>","<math xmlns=\"http://www.w3.org/1998/Math/MathML\"><mo>&#8594;</mo><mn>0</mn></math>"];
	var i;
	var _g1 = 0, _g = tests.length;
	while(_g1 < _g) {
		var i1 = _g1++;
		var res = this.prepareFormulas(tests[i1]);
		if(!(res == responses[i1])) throw "Expected: '" + responses[i1] + "' but got: '" + res + "'.";
	}
}
com.wiris.quizzes.HTMLTools.prototype.unitTestExtractText = function() {
	var inputs = ["<math xmlns=\"http://www.w3.org/1998/Math/MathML\"><mrow><mtext>Cap de les altres</mtext></mrow></math>","<math><mrow><mtext>La resposta és </mtext><mfrac><mfrac><mn>1</mn><mn>2</mn></mfrac><mi>x</mi></mfrac><mtext>.</mtext></mrow></math>","<math><mrow><mo>(</mo><mtext>tiruliru</mtext><mo>)</mo></mrow></math>","<math><mrow><msqrt><mtext>radicand</mtext></msqrt></mrow></math>"];
	var outputs = ["Cap de les altres","La resposta és <math><mrow><mfrac><mfrac><mn>1</mn><mn>2</mn></mfrac><mi>x</mi></mfrac></mrow></math>.","<math><mrow><mo>(</mo></mrow></math>tiruliru<math><mrow><mo>)</mo></mrow></math>","<math><mrow><msqrt><mtext>radicand</mtext></msqrt></mrow></math>"];
	var i;
	var _g1 = 0, _g = inputs.length;
	while(_g1 < _g) {
		var i1 = _g1++;
		var coutput = this.extractTextFromMathML(inputs[i1]);
		if(!(coutput == outputs[i1])) throw "Expected: '" + outputs[i1] + "' but got: '" + coutput + "'.";
	}
}
com.wiris.quizzes.HTMLTools.prototype.unitTestReplaceVariablesInHTML = function() {
	var texts = ["<p><img align=\"middle\" src=\"http://localhost/moodle21/lib/editor/tinymce/tiny_mce/3.4.2/plugins/tiny_mce_wiris/integration/showimage.php?formula=cb550f21cbc30fac59e4f2bba550693d.png\" /> + #dif</p>","a  «math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;»«mfrac»«mrow»«mi»#«/mi»«mi»a«/mi»«mo»+«/mo»«mn»1«/mn»«/mrow»«mrow»«mi»#«/mi»«mi»b«/mi»«mo»-«/mo»«mn»1«/mn»«/mrow»«/mfrac»«/math» a","<math><mo>#</mo><mi>a</mi></math>"];
	var mml = new Hash();
	mml.set("dif","<math><mn>0</mn></math>");
	mml.set("a","<math><mi>x</mi></math>");
	mml.set("b","<math><mi>y</mi></math>");
	var v = new Hash();
	v.set(com.wiris.quizzes.MathContent.TYPE_MATHML,mml);
	var responses = ["<p><img align=\"middle\" src=\"http://localhost/moodle21/lib/editor/tinymce/tiny_mce/3.4.2/plugins/tiny_mce_wiris/integration/showimage.php?formula=cb550f21cbc30fac59e4f2bba550693d.png\" /> + <math><mn>0</mn></math></p>","a  «math xmlns=¨http://www.w3.org/1998/Math/MathML¨»«mfrac»«mrow»«mrow»«mi»x«/mi»«/mrow»«mo»+«/mo»«mn»1«/mn»«/mrow»«mrow»«mrow»«mi»y«/mi»«/mrow»«mo»-«/mo»«mn»1«/mn»«/mrow»«/mfrac»«/math» a","<math><mrow><mi>x</mi></mrow></math>"];
	var i;
	var _g1 = 0, _g = texts.length;
	while(_g1 < _g) {
		var i1 = _g1++;
		var res = this.expandVariables(texts[i1],v);
		if(!(res == responses[i1])) throw "Expected: '" + responses[i1] + "' but got: '" + res + "'.";
	}
}
com.wiris.quizzes.HTMLTools.prototype.unitTestTextToMathML = function() {
	var texts = ["sin(x)+1","#F +C","2.0·xy"];
	var responses = ["<math xmlns=\"http://www.w3.org/1998/Math/MathML\"><mi>sin</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>+</mo><mn>1</mn></math>","<math xmlns=\"http://www.w3.org/1998/Math/MathML\"><mo>#</mo><mi>F</mi><mo>+</mo><mi>C</mi></math>","<math xmlns=\"http://www.w3.org/1998/Math/MathML\"><mn>2</mn><mo>.</mo><mn>0</mn><mo>·</mo><mi>x</mi><mi>y</mi></math>"];
	var i;
	var _g1 = 0, _g = texts.length;
	while(_g1 < _g) {
		var i1 = _g1++;
		var res = this.textToMathML(texts[i1]);
		if(!(res == responses[i1])) throw "Expected: '" + responses[i1] + "' but got: '" + res + "'.";
	}
}
com.wiris.quizzes.HTMLTools.prototype.unitTestMathMLToText = function() {
	var mathml = ["<math xmlns=\"http://www.w3.org/1998/Math/MathML\"><mi>sin</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>+</mo><mn>1</mn></math>","<math xmlns=\"http://www.w3.org/1998/Math/MathML\"><mo>#</mo><mi>F</mi><mo>+</mo><mi>C</mi></math>","<math xmlns=\"http://www.w3.org/1998/Math/MathML\"><mn>2</mn><mo>.</mo><mn>0</mn><mo>·</mo><mi>x</mi><mi>y</mi></math>","<math xmlns=\"http://www.w3.org/1998/Math/MathML\"><mi mathvariant=\"normal\">sin</mi><mi>x</mi></math>"];
	var responses = ["sin(x)+1","#F+C","2.0·xy","sin x"];
	var i;
	var _g1 = 0, _g = mathml.length;
	while(_g1 < _g) {
		var i1 = _g1++;
		var res = this.mathMLToText(mathml[i1]);
		if(!(res == responses[i1])) throw "Expected: '" + responses[i1] + "' but got: '" + res + "'.";
	}
}
com.wiris.quizzes.HTMLTools.prototype.unitTest = function() {
	this.unitTestExtractText();
	this.unitTestTextToMathML();
	this.unitTestReplaceVariablesInHTML();
	this.unitTestPrepareFormulasAlgorithm();
	this.unitTestMathMLToText();
}
com.wiris.quizzes.HTMLTools.prototype.__class__ = com.wiris.quizzes.HTMLTools;
haxe.Log = function() { }
haxe.Log.__name__ = ["haxe","Log"];
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
}
haxe.Log.clear = function() {
	js.Boot.__clear_trace();
}
haxe.Log.prototype.__class__ = haxe.Log;
Hash = function(p) {
	if( p === $_ ) return;
	this.h = {}
	if(this.h.__proto__ != null) {
		this.h.__proto__ = null;
		delete(this.h.__proto__);
	}
}
Hash.__name__ = ["Hash"];
Hash.prototype.h = null;
Hash.prototype.set = function(key,value) {
	this.h["$" + key] = value;
}
Hash.prototype.get = function(key) {
	return this.h["$" + key];
}
Hash.prototype.exists = function(key) {
	try {
		key = "$" + key;
		return this.hasOwnProperty.call(this.h,key);
	} catch( e ) {
		for(var i in this.h) if( i == key ) return true;
		return false;
	}
}
Hash.prototype.remove = function(key) {
	if(!this.exists(key)) return false;
	delete(this.h["$" + key]);
	return true;
}
Hash.prototype.keys = function() {
	var a = new Array();
	for(var i in this.h) a.push(i.substr(1));
	return a.iterator();
}
Hash.prototype.iterator = function() {
	return { ref : this.h, it : this.keys(), hasNext : function() {
		return this.it.hasNext();
	}, next : function() {
		var i = this.it.next();
		return this.ref["$" + i];
	}};
}
Hash.prototype.toString = function() {
	var s = new StringBuf();
	s.b[s.b.length] = "{" == null?"null":"{";
	var it = this.keys();
	while( it.hasNext() ) {
		var i = it.next();
		s.b[s.b.length] = i == null?"null":i;
		s.b[s.b.length] = " => " == null?"null":" => ";
		s.add(Std.string(this.get(i)));
		if(it.hasNext()) s.b[s.b.length] = ", " == null?"null":", ";
	}
	s.b[s.b.length] = "}" == null?"null":"}";
	return s.b.join("");
}
Hash.prototype.__class__ = Hash;
if(!com.wiris.util) com.wiris.util = {}
if(!com.wiris.util.xml) com.wiris.util.xml = {}
com.wiris.util.xml.WEntities = function() { }
com.wiris.util.xml.WEntities.__name__ = ["com","wiris","util","xml","WEntities"];
com.wiris.util.xml.WEntities.prototype.__class__ = com.wiris.util.xml.WEntities;
com.wiris.system.StringEx = function() { }
com.wiris.system.StringEx.__name__ = ["com","wiris","system","StringEx"];
com.wiris.system.StringEx.substring = function(s,start,end) {
	if(end == null) return s.substr(start);
	return s.substr(start,end - start);
}
com.wiris.system.StringEx.prototype.__class__ = com.wiris.system.StringEx;
Std = function() { }
Std.__name__ = ["Std"];
Std["is"] = function(v,t) {
	return js.Boot.__instanceof(v,t);
}
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
Std["int"] = function(x) {
	if(x < 0) return Math.ceil(x);
	return Math.floor(x);
}
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && x.charCodeAt(1) == 120) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
}
Std.parseFloat = function(x) {
	return parseFloat(x);
}
Std.random = function(x) {
	return Math.floor(Math.random() * x);
}
Std.prototype.__class__ = Std;
com.wiris.quizzes.Answer = function(p) {
	if( p === $_ ) return;
	com.wiris.quizzes.MathContent.call(this);
	this.id = 0;
}
com.wiris.quizzes.Answer.__name__ = ["com","wiris","quizzes","Answer"];
com.wiris.quizzes.Answer.__super__ = com.wiris.quizzes.MathContent;
for(var k in com.wiris.quizzes.MathContent.prototype ) com.wiris.quizzes.Answer.prototype[k] = com.wiris.quizzes.MathContent.prototype[k];
com.wiris.quizzes.Answer.prototype.id = null;
com.wiris.quizzes.Answer.prototype.newInstance = function() {
	return new com.wiris.quizzes.Answer();
}
com.wiris.quizzes.Answer.prototype.onSerialize = function(s) {
	s.beginTag(com.wiris.quizzes.Answer.tagName);
	this.id = s.attributeInt("id",this.id,0);
	com.wiris.quizzes.MathContent.prototype.onSerializeInner.call(this,s);
	s.endTag();
}
com.wiris.quizzes.Answer.prototype.__class__ = com.wiris.quizzes.Answer;
com.wiris.quizzes.MultipleQuestionRequest = function(p) {
	if( p === $_ ) return;
	com.wiris.quizzes.Serializable.call(this);
}
com.wiris.quizzes.MultipleQuestionRequest.__name__ = ["com","wiris","quizzes","MultipleQuestionRequest"];
com.wiris.quizzes.MultipleQuestionRequest.__super__ = com.wiris.quizzes.Serializable;
for(var k in com.wiris.quizzes.Serializable.prototype ) com.wiris.quizzes.MultipleQuestionRequest.prototype[k] = com.wiris.quizzes.Serializable.prototype[k];
com.wiris.quizzes.MultipleQuestionRequest.prototype.questionRequests = null;
com.wiris.quizzes.MultipleQuestionRequest.prototype.onSerialize = function(s) {
	s.beginTag(com.wiris.quizzes.MultipleQuestionRequest.tagName);
	this.questionRequests = s.serializeArray(this.questionRequests,null);
	s.endTag();
}
com.wiris.quizzes.MultipleQuestionRequest.prototype.newInstance = function() {
	return new com.wiris.quizzes.MultipleQuestionRequest();
}
com.wiris.quizzes.MultipleQuestionRequest.prototype.__class__ = com.wiris.quizzes.MultipleQuestionRequest;
haxe.Md5 = function(p) {
}
haxe.Md5.__name__ = ["haxe","Md5"];
haxe.Md5.encode = function(s) {
	return new haxe.Md5().doEncode(s);
}
haxe.Md5.prototype.bitOR = function(a,b) {
	var lsb = a & 1 | b & 1;
	var msb31 = a >>> 1 | b >>> 1;
	return msb31 << 1 | lsb;
}
haxe.Md5.prototype.bitXOR = function(a,b) {
	var lsb = a & 1 ^ b & 1;
	var msb31 = a >>> 1 ^ b >>> 1;
	return msb31 << 1 | lsb;
}
haxe.Md5.prototype.bitAND = function(a,b) {
	var lsb = a & 1 & (b & 1);
	var msb31 = a >>> 1 & b >>> 1;
	return msb31 << 1 | lsb;
}
haxe.Md5.prototype.addme = function(x,y) {
	var lsw = (x & 65535) + (y & 65535);
	var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
	return msw << 16 | lsw & 65535;
}
haxe.Md5.prototype.rhex = function(num) {
	var str = "";
	var hex_chr = "0123456789abcdef";
	var _g = 0;
	while(_g < 4) {
		var j = _g++;
		str += hex_chr.charAt(num >> j * 8 + 4 & 15) + hex_chr.charAt(num >> j * 8 & 15);
	}
	return str;
}
haxe.Md5.prototype.str2blks = function(str) {
	var nblk = (str.length + 8 >> 6) + 1;
	var blks = new Array();
	var _g1 = 0, _g = nblk * 16;
	while(_g1 < _g) {
		var i = _g1++;
		blks[i] = 0;
	}
	var i = 0;
	while(i < str.length) {
		blks[i >> 2] |= str.charCodeAt(i) << (str.length * 8 + i) % 4 * 8;
		i++;
	}
	blks[i >> 2] |= 128 << (str.length * 8 + i) % 4 * 8;
	var l = str.length * 8;
	var k = nblk * 16 - 2;
	blks[k] = l & 255;
	blks[k] |= (l >>> 8 & 255) << 8;
	blks[k] |= (l >>> 16 & 255) << 16;
	blks[k] |= (l >>> 24 & 255) << 24;
	return blks;
}
haxe.Md5.prototype.rol = function(num,cnt) {
	return num << cnt | num >>> 32 - cnt;
}
haxe.Md5.prototype.cmn = function(q,a,b,x,s,t) {
	return this.addme(this.rol(this.addme(this.addme(a,q),this.addme(x,t)),s),b);
}
haxe.Md5.prototype.ff = function(a,b,c,d,x,s,t) {
	return this.cmn(this.bitOR(this.bitAND(b,c),this.bitAND(~b,d)),a,b,x,s,t);
}
haxe.Md5.prototype.gg = function(a,b,c,d,x,s,t) {
	return this.cmn(this.bitOR(this.bitAND(b,d),this.bitAND(c,~d)),a,b,x,s,t);
}
haxe.Md5.prototype.hh = function(a,b,c,d,x,s,t) {
	return this.cmn(this.bitXOR(this.bitXOR(b,c),d),a,b,x,s,t);
}
haxe.Md5.prototype.ii = function(a,b,c,d,x,s,t) {
	return this.cmn(this.bitXOR(c,this.bitOR(b,~d)),a,b,x,s,t);
}
haxe.Md5.prototype.doEncode = function(str) {
	var x = this.str2blks(str);
	var a = 1732584193;
	var b = -271733879;
	var c = -1732584194;
	var d = 271733878;
	var step;
	var i = 0;
	while(i < x.length) {
		var olda = a;
		var oldb = b;
		var oldc = c;
		var oldd = d;
		step = 0;
		a = this.ff(a,b,c,d,x[i],7,-680876936);
		d = this.ff(d,a,b,c,x[i + 1],12,-389564586);
		c = this.ff(c,d,a,b,x[i + 2],17,606105819);
		b = this.ff(b,c,d,a,x[i + 3],22,-1044525330);
		a = this.ff(a,b,c,d,x[i + 4],7,-176418897);
		d = this.ff(d,a,b,c,x[i + 5],12,1200080426);
		c = this.ff(c,d,a,b,x[i + 6],17,-1473231341);
		b = this.ff(b,c,d,a,x[i + 7],22,-45705983);
		a = this.ff(a,b,c,d,x[i + 8],7,1770035416);
		d = this.ff(d,a,b,c,x[i + 9],12,-1958414417);
		c = this.ff(c,d,a,b,x[i + 10],17,-42063);
		b = this.ff(b,c,d,a,x[i + 11],22,-1990404162);
		a = this.ff(a,b,c,d,x[i + 12],7,1804603682);
		d = this.ff(d,a,b,c,x[i + 13],12,-40341101);
		c = this.ff(c,d,a,b,x[i + 14],17,-1502002290);
		b = this.ff(b,c,d,a,x[i + 15],22,1236535329);
		a = this.gg(a,b,c,d,x[i + 1],5,-165796510);
		d = this.gg(d,a,b,c,x[i + 6],9,-1069501632);
		c = this.gg(c,d,a,b,x[i + 11],14,643717713);
		b = this.gg(b,c,d,a,x[i],20,-373897302);
		a = this.gg(a,b,c,d,x[i + 5],5,-701558691);
		d = this.gg(d,a,b,c,x[i + 10],9,38016083);
		c = this.gg(c,d,a,b,x[i + 15],14,-660478335);
		b = this.gg(b,c,d,a,x[i + 4],20,-405537848);
		a = this.gg(a,b,c,d,x[i + 9],5,568446438);
		d = this.gg(d,a,b,c,x[i + 14],9,-1019803690);
		c = this.gg(c,d,a,b,x[i + 3],14,-187363961);
		b = this.gg(b,c,d,a,x[i + 8],20,1163531501);
		a = this.gg(a,b,c,d,x[i + 13],5,-1444681467);
		d = this.gg(d,a,b,c,x[i + 2],9,-51403784);
		c = this.gg(c,d,a,b,x[i + 7],14,1735328473);
		b = this.gg(b,c,d,a,x[i + 12],20,-1926607734);
		a = this.hh(a,b,c,d,x[i + 5],4,-378558);
		d = this.hh(d,a,b,c,x[i + 8],11,-2022574463);
		c = this.hh(c,d,a,b,x[i + 11],16,1839030562);
		b = this.hh(b,c,d,a,x[i + 14],23,-35309556);
		a = this.hh(a,b,c,d,x[i + 1],4,-1530992060);
		d = this.hh(d,a,b,c,x[i + 4],11,1272893353);
		c = this.hh(c,d,a,b,x[i + 7],16,-155497632);
		b = this.hh(b,c,d,a,x[i + 10],23,-1094730640);
		a = this.hh(a,b,c,d,x[i + 13],4,681279174);
		d = this.hh(d,a,b,c,x[i],11,-358537222);
		c = this.hh(c,d,a,b,x[i + 3],16,-722521979);
		b = this.hh(b,c,d,a,x[i + 6],23,76029189);
		a = this.hh(a,b,c,d,x[i + 9],4,-640364487);
		d = this.hh(d,a,b,c,x[i + 12],11,-421815835);
		c = this.hh(c,d,a,b,x[i + 15],16,530742520);
		b = this.hh(b,c,d,a,x[i + 2],23,-995338651);
		a = this.ii(a,b,c,d,x[i],6,-198630844);
		d = this.ii(d,a,b,c,x[i + 7],10,1126891415);
		c = this.ii(c,d,a,b,x[i + 14],15,-1416354905);
		b = this.ii(b,c,d,a,x[i + 5],21,-57434055);
		a = this.ii(a,b,c,d,x[i + 12],6,1700485571);
		d = this.ii(d,a,b,c,x[i + 3],10,-1894986606);
		c = this.ii(c,d,a,b,x[i + 10],15,-1051523);
		b = this.ii(b,c,d,a,x[i + 1],21,-2054922799);
		a = this.ii(a,b,c,d,x[i + 8],6,1873313359);
		d = this.ii(d,a,b,c,x[i + 15],10,-30611744);
		c = this.ii(c,d,a,b,x[i + 6],15,-1560198380);
		b = this.ii(b,c,d,a,x[i + 13],21,1309151649);
		a = this.ii(a,b,c,d,x[i + 4],6,-145523070);
		d = this.ii(d,a,b,c,x[i + 11],10,-1120210379);
		c = this.ii(c,d,a,b,x[i + 2],15,718787259);
		b = this.ii(b,c,d,a,x[i + 9],21,-343485551);
		a = this.addme(a,olda);
		b = this.addme(b,oldb);
		c = this.addme(c,oldc);
		d = this.addme(d,oldd);
		i += 16;
	}
	return this.rhex(a) + this.rhex(b) + this.rhex(c) + this.rhex(d);
}
haxe.Md5.prototype.__class__ = haxe.Md5;
com.wiris.quizzes.Result = function(p) {
	if( p === $_ ) return;
	com.wiris.quizzes.Serializable.call(this);
}
com.wiris.quizzes.Result.__name__ = ["com","wiris","quizzes","Result"];
com.wiris.quizzes.Result.__super__ = com.wiris.quizzes.Serializable;
for(var k in com.wiris.quizzes.Serializable.prototype ) com.wiris.quizzes.Result.prototype[k] = com.wiris.quizzes.Serializable.prototype[k];
com.wiris.quizzes.Result.prototype.errors = null;
com.wiris.quizzes.Result.prototype.onSerialize = function(s) {
}
com.wiris.quizzes.Result.prototype.newInstance = function() {
	return new com.wiris.quizzes.Result();
}
com.wiris.quizzes.Result.prototype.onSerializeInner = function(s) {
	this.errors = s.serializeArray(this.errors,"error");
}
com.wiris.quizzes.Result.prototype.__class__ = com.wiris.quizzes.Result;
com.wiris.quizzes.ResultGetCheckAssertions = function(p) {
	if( p === $_ ) return;
	com.wiris.quizzes.Result.call(this);
}
com.wiris.quizzes.ResultGetCheckAssertions.__name__ = ["com","wiris","quizzes","ResultGetCheckAssertions"];
com.wiris.quizzes.ResultGetCheckAssertions.__super__ = com.wiris.quizzes.Result;
for(var k in com.wiris.quizzes.Result.prototype ) com.wiris.quizzes.ResultGetCheckAssertions.prototype[k] = com.wiris.quizzes.Result.prototype[k];
com.wiris.quizzes.ResultGetCheckAssertions.prototype.checks = null;
com.wiris.quizzes.ResultGetCheckAssertions.prototype.onSerialize = function(s) {
	s.beginTag(com.wiris.quizzes.ResultGetCheckAssertions.tagName);
	this.onSerializeInner(s);
	this.checks = s.serializeArray(this.checks,null);
	s.endTag();
}
com.wiris.quizzes.ResultGetCheckAssertions.prototype.newInstance = function() {
	return new com.wiris.quizzes.ResultGetCheckAssertions();
}
com.wiris.quizzes.ResultGetCheckAssertions.prototype.__class__ = com.wiris.quizzes.ResultGetCheckAssertions;
com.wiris.quizzes.AssertionCheck = function(p) {
	if( p === $_ ) return;
	com.wiris.quizzes.Serializable.call(this);
}
com.wiris.quizzes.AssertionCheck.__name__ = ["com","wiris","quizzes","AssertionCheck"];
com.wiris.quizzes.AssertionCheck.__super__ = com.wiris.quizzes.Serializable;
for(var k in com.wiris.quizzes.Serializable.prototype ) com.wiris.quizzes.AssertionCheck.prototype[k] = com.wiris.quizzes.Serializable.prototype[k];
com.wiris.quizzes.AssertionCheck.prototype.value = null;
com.wiris.quizzes.AssertionCheck.prototype.assertion = null;
com.wiris.quizzes.AssertionCheck.prototype.answer = null;
com.wiris.quizzes.AssertionCheck.prototype.correctAnswer = null;
com.wiris.quizzes.AssertionCheck.prototype.onSerialize = function(s) {
	s.beginTag(com.wiris.quizzes.AssertionCheck.tagName);
	this.assertion = s.attributeString("assertion",this.assertion,null);
	this.answer = s.attributeInt("answer",this.answer,0);
	this.correctAnswer = s.attributeInt("correctAnswer",this.correctAnswer,0);
	this.value = s.booleanContent(this.value);
	s.endTag();
}
com.wiris.quizzes.AssertionCheck.prototype.newInstance = function() {
	return new com.wiris.quizzes.AssertionCheck();
}
com.wiris.quizzes.AssertionCheck.prototype.__class__ = com.wiris.quizzes.AssertionCheck;
haxe.io.Error = { __ename__ : ["haxe","io","Error"], __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] }
haxe.io.Error.Blocked = ["Blocked",0];
haxe.io.Error.Blocked.toString = $estr;
haxe.io.Error.Blocked.__enum__ = haxe.io.Error;
haxe.io.Error.Overflow = ["Overflow",1];
haxe.io.Error.Overflow.toString = $estr;
haxe.io.Error.Overflow.__enum__ = haxe.io.Error;
haxe.io.Error.OutsideBounds = ["OutsideBounds",2];
haxe.io.Error.OutsideBounds.toString = $estr;
haxe.io.Error.OutsideBounds.__enum__ = haxe.io.Error;
haxe.io.Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe.io.Error; $x.toString = $estr; return $x; }
com.wiris.quizzes.ResultGetVariables = function(p) {
	if( p === $_ ) return;
	com.wiris.quizzes.Result.call(this);
}
com.wiris.quizzes.ResultGetVariables.__name__ = ["com","wiris","quizzes","ResultGetVariables"];
com.wiris.quizzes.ResultGetVariables.__super__ = com.wiris.quizzes.Result;
for(var k in com.wiris.quizzes.Result.prototype ) com.wiris.quizzes.ResultGetVariables.prototype[k] = com.wiris.quizzes.Result.prototype[k];
com.wiris.quizzes.ResultGetVariables.prototype.variables = null;
com.wiris.quizzes.ResultGetVariables.prototype.onSerialize = function(s) {
	s.beginTag(com.wiris.quizzes.ResultGetVariables.tagName);
	this.onSerializeInner(s);
	this.variables = s.serializeArray(this.variables,null);
	s.endTag();
}
com.wiris.quizzes.ResultGetVariables.prototype.newInstance = function() {
	return new com.wiris.quizzes.ResultGetVariables();
}
com.wiris.quizzes.ResultGetVariables.prototype.__class__ = com.wiris.quizzes.ResultGetVariables;
com.wiris.quizzes.QuizzesConfig = function(p) {
}
com.wiris.quizzes.QuizzesConfig.__name__ = ["com","wiris","quizzes","QuizzesConfig"];
com.wiris.quizzes.QuizzesConfig.prototype.__class__ = com.wiris.quizzes.QuizzesConfig;
com.wiris.quizzes.Variable = function(p) {
	if( p === $_ ) return;
	com.wiris.quizzes.MathContent.call(this);
}
com.wiris.quizzes.Variable.__name__ = ["com","wiris","quizzes","Variable"];
com.wiris.quizzes.Variable.__super__ = com.wiris.quizzes.MathContent;
for(var k in com.wiris.quizzes.MathContent.prototype ) com.wiris.quizzes.Variable.prototype[k] = com.wiris.quizzes.MathContent.prototype[k];
com.wiris.quizzes.Variable.prototype.name = null;
com.wiris.quizzes.Variable.prototype.newInstance = function() {
	return new com.wiris.quizzes.Variable();
}
com.wiris.quizzes.Variable.prototype.onSerialize = function(s) {
	s.beginTag(com.wiris.quizzes.Variable.tagName);
	this.name = s.attributeString("name",this.name,null);
	this.onSerializeInner(s);
	s.endTag();
}
com.wiris.quizzes.Variable.prototype.__class__ = com.wiris.quizzes.Variable;
haxe.io.Bytes = function(length,b) {
	if( length === $_ ) return;
	this.length = length;
	this.b = b;
}
haxe.io.Bytes.__name__ = ["haxe","io","Bytes"];
haxe.io.Bytes.alloc = function(length) {
	var a = new Array();
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		a.push(0);
	}
	return new haxe.io.Bytes(length,a);
}
haxe.io.Bytes.ofString = function(s) {
	var a = new Array();
	var _g1 = 0, _g = s.length;
	while(_g1 < _g) {
		var i = _g1++;
		var c = s.cca(i);
		if(c <= 127) a.push(c); else if(c <= 2047) {
			a.push(192 | c >> 6);
			a.push(128 | c & 63);
		} else if(c <= 65535) {
			a.push(224 | c >> 12);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		} else {
			a.push(240 | c >> 18);
			a.push(128 | c >> 12 & 63);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		}
	}
	return new haxe.io.Bytes(a.length,a);
}
haxe.io.Bytes.ofData = function(b) {
	return new haxe.io.Bytes(b.length,b);
}
haxe.io.Bytes.prototype.length = null;
haxe.io.Bytes.prototype.b = null;
haxe.io.Bytes.prototype.get = function(pos) {
	return this.b[pos];
}
haxe.io.Bytes.prototype.set = function(pos,v) {
	this.b[pos] = v & 255;
}
haxe.io.Bytes.prototype.blit = function(pos,src,srcpos,len) {
	if(pos < 0 || srcpos < 0 || len < 0 || pos + len > this.length || srcpos + len > src.length) throw haxe.io.Error.OutsideBounds;
	var b1 = this.b;
	var b2 = src.b;
	if(b1 == b2 && pos > srcpos) {
		var i = len;
		while(i > 0) {
			i--;
			b1[i + pos] = b2[i + srcpos];
		}
		return;
	}
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		b1[i + pos] = b2[i + srcpos];
	}
}
haxe.io.Bytes.prototype.sub = function(pos,len) {
	if(pos < 0 || len < 0 || pos + len > this.length) throw haxe.io.Error.OutsideBounds;
	return new haxe.io.Bytes(len,this.b.slice(pos,pos + len));
}
haxe.io.Bytes.prototype.compare = function(other) {
	var b1 = this.b;
	var b2 = other.b;
	var len = this.length < other.length?this.length:other.length;
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		if(b1[i] != b2[i]) return b1[i] - b2[i];
	}
	return this.length - other.length;
}
haxe.io.Bytes.prototype.readString = function(pos,len) {
	if(pos < 0 || len < 0 || pos + len > this.length) throw haxe.io.Error.OutsideBounds;
	var s = "";
	var b = this.b;
	var fcc = String.fromCharCode;
	var i = pos;
	var max = pos + len;
	while(i < max) {
		var c = b[i++];
		if(c < 128) {
			if(c == 0) break;
			s += fcc(c);
		} else if(c < 224) s += fcc((c & 63) << 6 | b[i++] & 127); else if(c < 240) {
			var c2 = b[i++];
			s += fcc((c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127);
		} else {
			var c2 = b[i++];
			var c3 = b[i++];
			s += fcc((c & 15) << 18 | (c2 & 127) << 12 | c3 << 6 & 127 | b[i++] & 127);
		}
	}
	return s;
}
haxe.io.Bytes.prototype.toString = function() {
	return this.readString(0,this.length);
}
haxe.io.Bytes.prototype.toHex = function() {
	var s = new StringBuf();
	var chars = [];
	var str = "0123456789abcdef";
	var _g1 = 0, _g = str.length;
	while(_g1 < _g) {
		var i = _g1++;
		chars.push(str.charCodeAt(i));
	}
	var _g1 = 0, _g = this.length;
	while(_g1 < _g) {
		var i = _g1++;
		var c = this.b[i];
		s.b[s.b.length] = String.fromCharCode(chars[c >> 4]);
		s.b[s.b.length] = String.fromCharCode(chars[c & 15]);
	}
	return s.b.join("");
}
haxe.io.Bytes.prototype.getData = function() {
	return this.b;
}
haxe.io.Bytes.prototype.__class__ = haxe.io.Bytes;
haxe.io.Input = function() { }
haxe.io.Input.__name__ = ["haxe","io","Input"];
haxe.io.Input.prototype.bigEndian = null;
haxe.io.Input.prototype.readByte = function() {
	return (function($this) {
		var $r;
		throw "Not implemented";
		return $r;
	}(this));
}
haxe.io.Input.prototype.readBytes = function(s,pos,len) {
	var k = len;
	var b = s.b;
	if(pos < 0 || len < 0 || pos + len > s.length) throw haxe.io.Error.OutsideBounds;
	while(k > 0) {
		b[pos] = this.readByte();
		pos++;
		k--;
	}
	return len;
}
haxe.io.Input.prototype.close = function() {
}
haxe.io.Input.prototype.setEndian = function(b) {
	this.bigEndian = b;
	return b;
}
haxe.io.Input.prototype.readAll = function(bufsize) {
	if(bufsize == null) bufsize = 16384;
	var buf = haxe.io.Bytes.alloc(bufsize);
	var total = new haxe.io.BytesBuffer();
	try {
		while(true) {
			var len = this.readBytes(buf,0,bufsize);
			if(len == 0) throw haxe.io.Error.Blocked;
			total.addBytes(buf,0,len);
		}
	} catch( e ) {
		if( js.Boot.__instanceof(e,haxe.io.Eof) ) {
		} else throw(e);
	}
	return total.getBytes();
}
haxe.io.Input.prototype.readFullBytes = function(s,pos,len) {
	while(len > 0) {
		var k = this.readBytes(s,pos,len);
		pos += k;
		len -= k;
	}
}
haxe.io.Input.prototype.read = function(nbytes) {
	var s = haxe.io.Bytes.alloc(nbytes);
	var p = 0;
	while(nbytes > 0) {
		var k = this.readBytes(s,p,nbytes);
		if(k == 0) throw haxe.io.Error.Blocked;
		p += k;
		nbytes -= k;
	}
	return s;
}
haxe.io.Input.prototype.readUntil = function(end) {
	var buf = new StringBuf();
	var last;
	while((last = this.readByte()) != end) buf.b[buf.b.length] = String.fromCharCode(last);
	return buf.b.join("");
}
haxe.io.Input.prototype.readLine = function() {
	var buf = new StringBuf();
	var last;
	var s;
	try {
		while((last = this.readByte()) != 10) buf.b[buf.b.length] = String.fromCharCode(last);
		s = buf.b.join("");
		if(s.charCodeAt(s.length - 1) == 13) s = s.substr(0,-1);
	} catch( e ) {
		if( js.Boot.__instanceof(e,haxe.io.Eof) ) {
			s = buf.b.join("");
			if(s.length == 0) throw e;
		} else throw(e);
	}
	return s;
}
haxe.io.Input.prototype.readFloat = function() {
	throw "Not implemented";
	return 0;
}
haxe.io.Input.prototype.readDouble = function() {
	throw "Not implemented";
	return 0;
}
haxe.io.Input.prototype.readInt8 = function() {
	var n = this.readByte();
	if(n >= 128) return n - 256;
	return n;
}
haxe.io.Input.prototype.readInt16 = function() {
	var ch1 = this.readByte();
	var ch2 = this.readByte();
	var n = this.bigEndian?ch2 | ch1 << 8:ch1 | ch2 << 8;
	if((n & 32768) != 0) return n - 65536;
	return n;
}
haxe.io.Input.prototype.readUInt16 = function() {
	var ch1 = this.readByte();
	var ch2 = this.readByte();
	return this.bigEndian?ch2 | ch1 << 8:ch1 | ch2 << 8;
}
haxe.io.Input.prototype.readInt24 = function() {
	var ch1 = this.readByte();
	var ch2 = this.readByte();
	var ch3 = this.readByte();
	var n = this.bigEndian?ch3 | ch2 << 8 | ch1 << 16:ch1 | ch2 << 8 | ch3 << 16;
	if((n & 8388608) != 0) return n - 16777216;
	return n;
}
haxe.io.Input.prototype.readUInt24 = function() {
	var ch1 = this.readByte();
	var ch2 = this.readByte();
	var ch3 = this.readByte();
	return this.bigEndian?ch3 | ch2 << 8 | ch1 << 16:ch1 | ch2 << 8 | ch3 << 16;
}
haxe.io.Input.prototype.readInt31 = function() {
	var ch1, ch2, ch3, ch4;
	if(this.bigEndian) {
		ch4 = this.readByte();
		ch3 = this.readByte();
		ch2 = this.readByte();
		ch1 = this.readByte();
	} else {
		ch1 = this.readByte();
		ch2 = this.readByte();
		ch3 = this.readByte();
		ch4 = this.readByte();
	}
	if((ch4 & 128) == 0 != ((ch4 & 64) == 0)) throw haxe.io.Error.Overflow;
	return ch1 | ch2 << 8 | ch3 << 16 | ch4 << 24;
}
haxe.io.Input.prototype.readUInt30 = function() {
	var ch1 = this.readByte();
	var ch2 = this.readByte();
	var ch3 = this.readByte();
	var ch4 = this.readByte();
	if((this.bigEndian?ch1:ch4) >= 64) throw haxe.io.Error.Overflow;
	return this.bigEndian?ch4 | ch3 << 8 | ch2 << 16 | ch1 << 24:ch1 | ch2 << 8 | ch3 << 16 | ch4 << 24;
}
haxe.io.Input.prototype.readInt32 = function() {
	var ch1 = this.readByte();
	var ch2 = this.readByte();
	var ch3 = this.readByte();
	var ch4 = this.readByte();
	return this.bigEndian?(ch1 << 8 | ch2) << 16 | (ch3 << 8 | ch4):(ch4 << 8 | ch3) << 16 | (ch2 << 8 | ch1);
}
haxe.io.Input.prototype.readString = function(len) {
	var b = haxe.io.Bytes.alloc(len);
	this.readFullBytes(b,0,len);
	return b.toString();
}
haxe.io.Input.prototype.__class__ = haxe.io.Input;
haxe.Int32 = function() { }
haxe.Int32.__name__ = ["haxe","Int32"];
haxe.Int32.make = function(a,b) {
	return a << 16 | b;
}
haxe.Int32.ofInt = function(x) {
	return x | 0;
}
haxe.Int32.clamp = function(x) {
	return x | 0;
}
haxe.Int32.toInt = function(x) {
	if((x >> 30 & 1) != x >>> 31) throw "Overflow " + x;
	return x;
}
haxe.Int32.toNativeInt = function(x) {
	return x;
}
haxe.Int32.add = function(a,b) {
	return a + b | 0;
}
haxe.Int32.sub = function(a,b) {
	return a - b | 0;
}
haxe.Int32.mul = function(a,b) {
	return a * b | 0;
}
haxe.Int32.div = function(a,b) {
	return Std["int"](a / b);
}
haxe.Int32.mod = function(a,b) {
	return a % b;
}
haxe.Int32.shl = function(a,b) {
	return a << b;
}
haxe.Int32.shr = function(a,b) {
	return a >> b;
}
haxe.Int32.ushr = function(a,b) {
	return a >>> b;
}
haxe.Int32.and = function(a,b) {
	return a & b;
}
haxe.Int32.or = function(a,b) {
	return a | b;
}
haxe.Int32.xor = function(a,b) {
	return a ^ b;
}
haxe.Int32.neg = function(a) {
	return -a;
}
haxe.Int32.isNeg = function(a) {
	return a < 0;
}
haxe.Int32.isZero = function(a) {
	return a == 0;
}
haxe.Int32.complement = function(a) {
	return ~a;
}
haxe.Int32.compare = function(a,b) {
	return a - b;
}
haxe.Int32.ucompare = function(a,b) {
	if(a < 0) return b < 0?~b - ~a:1;
	return b < 0?-1:a - b;
}
haxe.Int32.prototype.__class__ = haxe.Int32;
com.wiris.util.xml.WXmlUtils = function() { }
com.wiris.util.xml.WXmlUtils.__name__ = ["com","wiris","util","xml","WXmlUtils"];
com.wiris.util.xml.WXmlUtils.getElementContent = function(element) {
	var sb = new StringBuf();
	var i = element.iterator();
	while(i.hasNext()) sb.add(i.next().toString());
	return sb.b.join("");
}
com.wiris.util.xml.WXmlUtils.getElementsByAttributeValue = function(nodeList,attributeName,attributeValue) {
	var nodes = new Array();
	while(nodeList.hasNext()) {
		var node = nodeList.next();
		if(node.nodeType == Xml.Element && attributeValue == com.wiris.util.xml.WXmlUtils.getAttribute(node,attributeName)) nodes.push(node);
	}
	return nodes;
}
com.wiris.util.xml.WXmlUtils.getElementsByTagName = function(nodeList,tagName) {
	var nodes = new Array();
	while(nodeList.hasNext()) {
		var node = nodeList.next();
		if(node.nodeType == Xml.Element && node.getNodeName() == tagName) nodes.push(node);
	}
	return nodes;
}
com.wiris.util.xml.WXmlUtils.getElements = function(node) {
	var nodes = new Array();
	var nodeList = node.iterator();
	while(nodeList.hasNext()) {
		var item = nodeList.next();
		if(item.nodeType == Xml.Element) nodes.push(item);
	}
	return nodes;
}
com.wiris.util.xml.WXmlUtils.getDocumentElement = function(doc) {
	var nodeList = doc.iterator();
	while(nodeList.hasNext()) {
		var node = nodeList.next();
		if(node.nodeType == Xml.Element) return node;
	}
	return null;
}
com.wiris.util.xml.WXmlUtils.getAttribute = function(node,attributeName) {
	var value = node.get(attributeName);
	if(value == null) return null;
	if(com.wiris.settings.PlatformSettings.PARSE_XML_ENTITIES) return com.wiris.util.xml.WXmlUtils.htmlUnescape(value);
	return value;
}
com.wiris.util.xml.WXmlUtils.createPCData = function(node,text) {
	if(com.wiris.settings.PlatformSettings.PARSE_XML_ENTITIES) text = com.wiris.util.xml.WXmlUtils.htmlEscape(text);
	return Xml.createPCData(text);
}
com.wiris.util.xml.WXmlUtils.htmlEscape = function(input) {
	var output = StringTools.replace(input,"&","&amp;");
	output = StringTools.replace(output,"<","&lt;");
	output = StringTools.replace(output,">","&gt;");
	output = StringTools.replace(output,"\"","&quot;");
	return output;
}
com.wiris.util.xml.WXmlUtils.htmlUnescape = function(input) {
	var output = "";
	var start = 0;
	var position = input.indexOf("&",start);
	while(position != -1) {
		output += input.substr(start,position - start);
		if(input.charAt(position + 1) == "#") {
			var startPosition = position + 2;
			var endPosition = input.indexOf(";",startPosition);
			if(endPosition != -1) {
				var number = input.substr(startPosition,endPosition - startPosition);
				if(StringTools.startsWith(number,"x")) number = "0" + number;
				var charCode = Std.parseInt(number);
				output += String.fromCharCode(charCode);
				start = endPosition + 1;
			} else {
				output += "&";
				start = position + 1;
			}
		} else {
			output += "&";
			start = position + 1;
		}
		position = input.indexOf("&",start);
	}
	output += input.substr(start,input.length - start);
	output = StringTools.replace(output,"&lt;","<");
	output = StringTools.replace(output,"&gt;",">");
	output = StringTools.replace(output,"&quot;","\"");
	output = StringTools.replace(output,"&amp;","&");
	return output;
}
com.wiris.util.xml.WXmlUtils.entities = null;
com.wiris.util.xml.WXmlUtils.parseXML = function(xml) {
	xml = com.wiris.util.xml.WXmlUtils.filterMathMLEntities(xml);
	var x = Xml.parse(xml);
	return x;
}
com.wiris.util.xml.WXmlUtils.serializeXML = function(xml) {
	var s = xml.toString();
	s = com.wiris.util.xml.WXmlUtils.filterMathMLEntities(s);
	return s;
}
com.wiris.util.xml.WXmlUtils.filterMathMLEntities = function(text) {
	com.wiris.util.xml.WXmlUtils.initEntities();
	var sb = new StringBuf();
	var i = 0;
	var n = text.length;
	while(i < n) {
		var c = text.charCodeAt(i);
		if(c > 127) {
			var d = c;
			if(com.wiris.settings.PlatformSettings.UTF8_CONVERSION) {
				var j = 0;
				c = 128;
				do {
					c = c >> 1;
					j++;
				} while((d & c) != 0);
				d = c - 1 & d;
				while(--j > 0) {
					i++;
					c = text.charCodeAt(i);
					d = (d << 6) + (c & 63);
				}
			}
			sb.add("&#" + d + ";");
		} else {
			sb.b[sb.b.length] = String.fromCharCode(c);
			if(c == 38) {
				i++;
				c = text.charCodeAt(i);
				if(com.wiris.util.xml.WXmlUtils.isNameStart(c)) {
					var name = new StringBuf();
					name.b[name.b.length] = String.fromCharCode(c);
					i++;
					c = text.charCodeAt(i);
					while(com.wiris.util.xml.WXmlUtils.isNameChar(c)) {
						name.b[name.b.length] = String.fromCharCode(c);
						i++;
						c = text.charCodeAt(i);
					}
					var ent = name.b.join("");
					if(c == 59 && com.wiris.util.xml.WXmlUtils.entities.exists(ent)) {
						var val = com.wiris.util.xml.WXmlUtils.entities.get(ent);
						sb.b[sb.b.length] = "#" == null?"null":"#";
						sb.b[sb.b.length] = val == null?"null":val;
					} else sb.b[sb.b.length] = name == null?"null":name;
				} else if(c == 35) {
					sb.b[sb.b.length] = String.fromCharCode(c);
					i++;
					c = text.charCodeAt(i);
					if(c == 120) {
						var hex = new StringBuf();
						i++;
						c = text.charCodeAt(i);
						while(com.wiris.util.xml.WXmlUtils.isHexDigit(c)) {
							hex.b[hex.b.length] = String.fromCharCode(c);
							i++;
							c = text.charCodeAt(i);
						}
						var hent = hex.b.join("");
						if(c == 59) {
							var dec = Std.parseInt("0x" + hent);
							sb.add("" + dec);
						} else {
							sb.b[sb.b.length] = "x" == null?"null":"x";
							sb.b[sb.b.length] = hent == null?"null":hent;
						}
					}
				}
				sb.b[sb.b.length] = String.fromCharCode(c);
			}
		}
		i++;
	}
	return sb.b.join("");
}
com.wiris.util.xml.WXmlUtils.isNameStart = function(c) {
	if(65 <= c && c <= 90) return true;
	if(97 <= c && c <= 122) return true;
	if(c == 95 || c == 58) return true;
	return false;
}
com.wiris.util.xml.WXmlUtils.isNameChar = function(c) {
	if(com.wiris.util.xml.WXmlUtils.isNameStart(c)) return true;
	if(48 <= c && c <= 57) return true;
	if(c == 46 || c == 45) return true;
	return false;
}
com.wiris.util.xml.WXmlUtils.isHexDigit = function(c) {
	if(c >= 48 && c <= 57) return true;
	if(c >= 65 && c <= 70) return true;
	if(c >= 97 && c <= 102) return true;
	return false;
}
com.wiris.util.xml.WXmlUtils.initEntities = function() {
	if(com.wiris.util.xml.WXmlUtils.entities == null) {
		var e = com.wiris.util.xml.WEntities.MATHML_ENTITIES;
		com.wiris.util.xml.WXmlUtils.entities = new Hash();
		var start = 0;
		var mid;
		while((mid = e.indexOf("@",start)) != -1) {
			var name = e.substr(start,mid - start);
			mid++;
			start = e.indexOf("@",mid);
			if(start == -1) break;
			var value = e.substr(mid,start - mid);
			var num = Std.parseInt("0x" + value);
			com.wiris.util.xml.WXmlUtils.entities.set(name,"" + num);
			start++;
		}
	}
}
com.wiris.util.xml.WXmlUtils.prototype.__class__ = com.wiris.util.xml.WXmlUtils;
com.wiris.quizzes.ResultError = function(p) {
	if( p === $_ ) return;
	com.wiris.quizzes.Serializable.call(this);
}
com.wiris.quizzes.ResultError.__name__ = ["com","wiris","quizzes","ResultError"];
com.wiris.quizzes.ResultError.__super__ = com.wiris.quizzes.Serializable;
for(var k in com.wiris.quizzes.Serializable.prototype ) com.wiris.quizzes.ResultError.prototype[k] = com.wiris.quizzes.Serializable.prototype[k];
com.wiris.quizzes.ResultError.prototype.location = null;
com.wiris.quizzes.ResultError.prototype.detail = null;
com.wiris.quizzes.ResultError.prototype.type = null;
com.wiris.quizzes.ResultError.prototype.id = null;
com.wiris.quizzes.ResultError.prototype.newInstance = function() {
	return new com.wiris.quizzes.ResultError();
}
com.wiris.quizzes.ResultError.prototype.onSerialize = function(s) {
	s.beginTag(com.wiris.quizzes.ResultError.tagName);
	this.type = s.attributeString("type",this.type,null);
	this.id = s.attributeString("id",this.id,null);
	this.location = s.serializeChild(this.location);
	this.detail = s.childString("detail",this.detail,null);
	s.endTag();
}
com.wiris.quizzes.ResultError.prototype.__class__ = com.wiris.quizzes.ResultError;
com.wiris.quizzes.JsQuizzesFilter = function(p) {
	if( p === $_ ) return;
	this.questions = new Hash();
	this.instances = new Hash();
	this.controllers = new Array();
	this.t = com.wiris.quizzes.Translator.getInstance("en");
	this.htmlgui = new com.wiris.quizzes.HTMLGui("en");
}
com.wiris.quizzes.JsQuizzesFilter.__name__ = ["com","wiris","quizzes","JsQuizzesFilter"];
com.wiris.quizzes.JsQuizzesFilter.main = function() {
	var filter = new com.wiris.quizzes.JsQuizzesFilter();
	filter.run();
}
com.wiris.quizzes.JsQuizzesFilter.getElementsByClassName = function(className,tagName,element) {
	if(element == null) element = js.Lib.document;
	if(tagName == null) tagName = "*";
	try {
		if(typeof(element.getElementsByClassName) != 'undefined') return element.getElementsByClassName(className,tagName);
	} catch( e ) {
	}
	var elements = element.getElementsByTagName(tagName);
	var selected = new Array();
	var i;
	var n = elements.length;
	var _g = 0;
	while(_g < n) {
		var i1 = _g++;
		var elem = elements[i1];
		if(com.wiris.quizzes.JsQuizzesFilter.hasClass(elem,className)) selected.push(elem);
	}
	return selected;
}
com.wiris.quizzes.JsQuizzesFilter.hasClass = function(elem,className) {
	var elemClass = elem.className;
	return elem.nodeType == 1 && elemClass != null && (elemClass == className || StringTools.startsWith(elemClass,className + " ") || StringTools.endsWith(elemClass," " + className) || elemClass.indexOf(" " + className + " ") != -1);
}
com.wiris.quizzes.JsQuizzesFilter.addClass = function(elem,className) {
	if(!com.wiris.quizzes.JsQuizzesFilter.hasClass(elem,className)) {
		if(elem.className == null || elem.className.length == 0) elem.className = className; else elem.className = elem.className + " " + className;
	}
}
com.wiris.quizzes.JsQuizzesFilter.removeClass = function(elem,className) {
	if(com.wiris.quizzes.JsQuizzesFilter.hasClass(elem,className)) {
		elem.className = StringTools.replace(elem.className," " + className + " "," ");
		if(StringTools.startsWith(elem.className,className + " ")) elem.className = elem.className.substr(className.length + 1);
		if(StringTools.endsWith(elem.className," " + className)) elem.className = elem.className.substr(0,elem.className.length - (className.length + 1));
		if(elem.className == className) elem.className = "";
	}
}
com.wiris.quizzes.JsQuizzesFilter.getElementTextContent = function(element) {
	if(element.nodeType == 3 || element.nodeType == 4) return element.nodeValue; else if(element.nodeType == 1 || element.nodeType == 9) {
		var sb = new StringBuf();
		var i;
		var n = element.childNodes.length;
		var _g = 0;
		while(_g < n) {
			var i1 = _g++;
			sb.add(com.wiris.quizzes.JsQuizzesFilter.getElementTextContent(element.childNodes[i1]));
		}
		return sb.b.join("");
	} else return "";
}
com.wiris.quizzes.JsQuizzesFilter.prototype.questions = null;
com.wiris.quizzes.JsQuizzesFilter.prototype.instances = null;
com.wiris.quizzes.JsQuizzesFilter.prototype.controllers = null;
com.wiris.quizzes.JsQuizzesFilter.prototype.auxEditors = null;
com.wiris.quizzes.JsQuizzesFilter.prototype.auxEditorsMathML = null;
com.wiris.quizzes.JsQuizzesFilter.prototype.editorTimer = null;
com.wiris.quizzes.JsQuizzesFilter.prototype.currentPopup = null;
com.wiris.quizzes.JsQuizzesFilter.prototype.appletController = null;
com.wiris.quizzes.JsQuizzesFilter.prototype.t = null;
com.wiris.quizzes.JsQuizzesFilter.prototype.htmlgui = null;
com.wiris.quizzes.JsQuizzesFilter.prototype.service = null;
com.wiris.quizzes.JsQuizzesFilter.prototype.defaultQuestion = null;
com.wiris.quizzes.JsQuizzesFilter.prototype.defaultInstance = null;
com.wiris.quizzes.JsQuizzesFilter.prototype.run = function() {
	this.filterHtml();
	this.addFormSubmitHandlers(js.Lib.document,$closure(this,"formSubmitHandler"));
}
com.wiris.quizzes.JsQuizzesFilter.prototype.addBehaviors = function(element,question,questionElement,instance,instanceElement,original) {
	var me = this;
	var elements = element.getElementsByTagName("*");
	var behaviorElements = ["wiriscas","wiriscorrectanswer","wirisassertionparampart","wirisassertionparam","wirisassertion","wirisstructureselect","wirisoptionpart","wirisoption","wirisanswer","wiristablink","wirisrestartbutton","wiristestbutton","wirislocaldata","wirisinitialcontentbutton","wirisalgorithmlanguage"];
	var i = 0;
	var n = elements.length;
	var _g = 0;
	while(_g < n) {
		var i1 = _g++;
		var elem = [elements[i1]];
		var id = this.getMainId(elem[0].id);
		if(id == null || !this.inArray(id,behaviorElements)) continue;
		var controller = [new com.wiris.quizzes.JsInputController(elem[0],question,questionElement,instance,instanceElement)];
		if(id == "wiriscas" && question != null) {
			controller[0].setQuestionValue = (function() {
				return function(value) {
					if(value != null) {
						if(me.isEmptyWirisCasSession(value)) question.wirisCasSession = null; else question.wirisCasSession = value;
					}
				};
			})();
			controller[0].getQuestionValue = (function(elem) {
				return function() {
					var session;
					if(question.wirisCasSession != null) session = question.wirisCasSession; else session = me.getEmptyWirisCasSession(elem[0],true);
					return session;
				};
			})(elem);
			this.appletController = controller[0];
		} else if(id == "wiriscorrectanswer") {
			var index = [Std.parseInt(this.getIndex(elem[0].id,1))];
			controller[0].setQuestionValue = (function(index) {
				return function(value) {
					if(question != null) question.setCorrectAnswer(index[0],value);
				};
			})(index);
			controller[0].getQuestionValue = (function(index,elem) {
				return function() {
					var value;
					if(question != null && question.correctAnswers != null && question.correctAnswers.length > index[0]) value = question.correctAnswers[index[0]].content; else value = original.value;
					var tools = new com.wiris.quizzes.HTMLTools();
					var type = com.wiris.quizzes.MathContent.getMathType(value);
					if(com.wiris.quizzes.JsQuizzesFilter.hasClass(elem[0],"wirismathtextinput") && type == com.wiris.quizzes.MathContent.TYPE_MATHML) value = tools.mathMLToText(value); else if(com.wiris.quizzes.JsQuizzesFilter.hasClass(elem[0],"wiriseditor") && type == com.wiris.quizzes.MathContent.TYPE_TEXT) value = tools.textToMathML(value);
					return value;
				};
			})(index,elem);
			controller[0].updateInterface = (function() {
				return function(value) {
					if(!com.wiris.quizzes.JsQuizzesFilter.hasClass(original,com.wiris.quizzes.JsQuizzesFilter.CLASS_QUESTION) && !com.wiris.quizzes.JsQuizzesFilter.hasClass(original,com.wiris.quizzes.JsQuizzesFilter.CLASS_QUESTION_INSTANCE)) {
						original.value = value;
						var _g1 = 0, _g2 = me.controllers;
						while(_g1 < _g2.length) {
							var aux = _g2[_g1];
							++_g1;
							if(aux.element == original) aux.updateInputValue();
						}
					}
				};
			})();
		} else if(id == "wirisassertionparampart" && question != null) {
			var assertionNames = [this.getIndex(elem[0].id,1)];
			var paramName = [this.getIndex(elem[0].id,2)];
			var correctAnswer = [Std.parseInt(this.getIndex(elem[0].id,3))];
			var userAnswer = [Std.parseInt(this.getIndex(elem[0].id,4))];
			var elemDoc = elem[0].ownerDocument;
			controller[0].setQuestionValue = (function(userAnswer,correctAnswer,paramName,assertionNames,elem) {
				return function(value) {
					value = me.getAllPartsValue(elem[0]);
					var names = me.compoundParamToArray(assertionNames[0]);
					var _g1 = 0;
					while(_g1 < names.length) {
						var assertionName = names[_g1];
						++_g1;
						var index = question.getAssertionIndex(assertionName,correctAnswer[0],userAnswer[0]);
						if(index != -1) question.assertions[index].setParam(paramName[0],value);
					}
				};
			})(userAnswer,correctAnswer,paramName,assertionNames,elem);
			controller[0].getQuestionValue = (function(userAnswer,correctAnswer,paramName,assertionNames,elem) {
				return function() {
					var names = me.compoundParamToArray(assertionNames[0]);
					var formelem = elem[0];
					if(formelem.type == "checkbox") {
						var arrayPart = me.compoundParamToArray(formelem.value);
						var _g1 = 0;
						while(_g1 < names.length) {
							var assertionName = names[_g1];
							++_g1;
							var index = question.getAssertionIndex(assertionName,correctAnswer[0],userAnswer[0]);
							if(index != -1) {
								if(me.inList(formelem.value,question.assertions[index].getParam(paramName[0]))) return "true"; else return "false";
							}
						}
						if(me.inList(formelem.value,com.wiris.quizzes.Assertion.getParameterDefaultValue(names[0],paramName[0]))) return "true"; else return "false";
					} else if(formelem.type == "text") {
						var _g1 = 0;
						while(_g1 < names.length) {
							var assertionName = names[_g1];
							++_g1;
							var index = question.getAssertionIndex(assertionName,correctAnswer[0],userAnswer[0]);
							if(index != -1) {
								var paramValue = me.compoundParamToArray(question.assertions[index].getParam(paramName[0]));
								var paramDefault = me.compoundParamToArray(com.wiris.quizzes.Assertion.getParameterDefaultValue(assertionName,paramName[0]));
								return me.arrayDiff(paramValue,paramDefault).join(", ");
							}
						}
					}
					return "";
				};
			})(userAnswer,correctAnswer,paramName,assertionNames,elem);
			controller[0].updateInterface = (function(elem) {
				return function(value) {
					if(com.wiris.quizzes.JsQuizzesFilter.hasClass(elem[0],"wirisassertionparamall")) {
						var parent = elem[0].parentNode;
						while(parent.nodeName.toLowerCase() != "div") parent = parent.parentNode;
						var brothers = parent.getElementsByTagName("input");
						var j;
						var _g2 = 0, _g1 = brothers.length;
						while(_g2 < _g1) {
							var j1 = _g2++;
							var input = brothers[j1];
							if(input.type.toLowerCase() == "checkbox" && input != elem[0]) {
								input.checked = true;
								input.disabled = value.toLowerCase() == "true";
							}
						}
					}
				};
			})(elem);
		} else if(id == "wirisassertionparam" && question != null) {
			var assertionName = [this.getIndex(elem[0].id,1)];
			var paramName = [this.getIndex(elem[0].id,2)];
			var correctAnswer = [Std.parseInt(this.getIndex(elem[0].id,3))];
			var userAnswer = [Std.parseInt(this.getIndex(elem[0].id,4))];
			controller[0].setQuestionValue = (function(userAnswer,correctAnswer,paramName,assertionName) {
				return function(value) {
					var index = question.getAssertionIndex(assertionName[0],correctAnswer[0],userAnswer[0]);
					if(index != -1) question.assertions[index].setParam(paramName[0],value);
				};
			})(userAnswer,correctAnswer,paramName,assertionName);
			controller[0].getQuestionValue = (function(userAnswer,correctAnswer,paramName,assertionName) {
				return function() {
					var index = question.getAssertionIndex(assertionName[0],correctAnswer[0],userAnswer[0]);
					if(index != -1) return question.assertions[index].getParam(paramName[0]);
					return "";
				};
			})(userAnswer,correctAnswer,paramName,assertionName);
		} else if(id == "wirisassertion" && question != null) {
			var assertionName = [this.getIndex(elem[0].id,1)];
			var correctAnswer = [Std.parseInt(this.getIndex(elem[0].id,2))];
			var userAnswer = [Std.parseInt(this.getIndex(elem[0].id,3))];
			var singletons = [["equivalent_","syntax_"]];
			var defaultSingleton = [["equivalent_symbolic","syntax_expression"]];
			controller[0].setQuestionValue = (function(singletons,userAnswer,correctAnswer,assertionName) {
				return function(value) {
					var boolValue = value.toLowerCase() == "true";
					if(boolValue) {
						var prefix;
						var _g1 = 0;
						while(_g1 < singletons[0].length) {
							var prefix1 = singletons[0][_g1];
							++_g1;
							if(question.assertions != null && StringTools.startsWith(assertionName[0],prefix1)) {
								var k = question.assertions.length - 1;
								while(k >= 0) {
									var assertion = question.assertions[k];
									if(StringTools.startsWith(assertion.name,prefix1) && assertion.correctAnswer == correctAnswer[0] && assertion.answer == userAnswer[0]) question.assertions.remove(assertion);
									k--;
								}
							}
						}
						question.setAssertion(assertionName[0],correctAnswer[0],userAnswer[0]);
					} else {
						var index = question.getAssertionIndex(assertionName[0],correctAnswer[0],userAnswer[0]);
						if(index != -1) question.assertions.remove(question.assertions[index]);
					}
				};
			})(singletons,userAnswer,correctAnswer,assertionName);
			controller[0].getQuestionValue = (function(defaultSingleton,singletons,userAnswer,correctAnswer,assertionName) {
				return function() {
					if(question.getAssertionIndex(assertionName[0],correctAnswer[0],userAnswer[0]) != -1) return "true"; else {
						var j;
						var _g2 = 0, _g1 = defaultSingleton[0].length;
						while(_g2 < _g1) {
							var j1 = _g2++;
							if(defaultSingleton[0][j1] == assertionName[0]) {
								var found = false;
								if(question.assertions != null) {
									var assertion;
									var _g3 = 0, _g4 = question.assertions;
									while(_g3 < _g4.length) {
										var assertion1 = _g4[_g3];
										++_g3;
										if(StringTools.startsWith(assertion1.name,singletons[0][j1]) && assertion1.correctAnswer == correctAnswer[0] && assertion1.answer == userAnswer[0]) {
											found = true;
											break;
										}
									}
								}
								if(!found) {
									question.setAssertion(assertionName[0],correctAnswer[0],userAnswer[0]);
									return "true";
								}
							}
						}
						return "false";
					}
				};
			})(defaultSingleton,singletons,userAnswer,correctAnswer,assertionName);
			controller[0].updateInterface = (function(assertionName,elem) {
				return function(value) {
					var boolValue = value.toLowerCase() == "true";
					if(boolValue && StringTools.startsWith(assertionName[0],"syntax_")) {
						var superFieldset = elem[0].parentNode;
						while(superFieldset.nodeName.toLowerCase() != "fieldset") superFieldset = superFieldset.parentNode;
						var paramsFieldset = com.wiris.quizzes.JsQuizzesFilter.getElementsByClassName("wirissyntaxparams","fieldset",superFieldset)[0];
						var legend = me.t.t("syntaxparams");
						var visibleDivs = [];
						if(assertionName[0] == "syntax_expression") {
							legend = me.t.t("syntaxparams_expression");
							visibleDivs = ["wirissyntaxconstants","wirissyntaxfunctions"];
						} else if(assertionName[0] == "syntax_quantity") {
							legend = me.t.t("syntaxparams_quantity");
							visibleDivs = ["wirissyntaxconstants","wirissyntaxunits","wirissyntaxunitprefixes","wirissyntaxmixedfractions"];
						} else if(assertionName[0] == "syntax_list") {
							legend = me.t.t("syntaxparams_list");
							visibleDivs = ["wirissyntaxconstants","wirissyntaxfunctions"];
						}
						var allDivs = ["wirissyntaxconstants","wirissyntaxfunctions","wirissyntaxunits","wirissyntaxunitprefixes","wirissyntaxmixedfractions"];
						paramsFieldset.getElementsByTagName("legend")[0].innerHTML = legend;
						var divs = paramsFieldset.getElementsByTagName("div");
						var j;
						var _g2 = 0, _g1 = divs.length;
						while(_g2 < _g1) {
							var j1 = _g2++;
							var divId = me.getMainId(divs[j1].id);
							if(me.inArray(divId,allDivs)) {
								if(!me.inArray(divId,visibleDivs)) com.wiris.quizzes.JsQuizzesFilter.addClass(divs[j1],"wirishidden"); else com.wiris.quizzes.JsQuizzesFilter.removeClass(divs[j1],"wirishidden");
							}
						}
					}
				};
			})(assertionName,elem);
		} else if(id == "wirisstructureselect" && question != null) {
			var correctAnswer = [Std.parseInt(this.getIndex(elem[0].id,1))];
			var userAnswer = [Std.parseInt(this.getIndex(elem[0].id,2))];
			controller[0].setQuestionValue = (function(userAnswer,correctAnswer,elem) {
				return function(value) {
					var sel = elem[0];
					var index;
					var _g2 = 0, _g1 = sel.options.length;
					while(_g2 < _g1) {
						var index1 = _g2++;
						question.removeAssertion(sel.options[index1].value,correctAnswer[0],userAnswer[0]);
					}
					if(value != null && value != "") question.setAssertion(value,correctAnswer[0],userAnswer[0]);
				};
			})(userAnswer,correctAnswer,elem);
			controller[0].getQuestionValue = (function(userAnswer,correctAnswer) {
				return function() {
					var name;
					var _g1 = 0, _g2 = com.wiris.quizzes.Assertion.structure;
					while(_g1 < _g2.length) {
						var name1 = _g2[_g1];
						++_g1;
						var index = question.getAssertionIndex(name1,correctAnswer[0],userAnswer[0]);
						if(index != -1) return name1;
					}
					return "";
				};
			})(userAnswer,correctAnswer);
		} else if(id == "wirisoptionpart" && question != null) {
			var name = [this.getIndex(elem[0].id,1)];
			controller[0].setQuestionValue = (function(name,elem) {
				return function(value) {
					value = me.getAllPartsValue(elem[0]);
					question.setOption(name[0],value);
				};
			})(name,elem);
			controller[0].getQuestionValue = (function(name,elem) {
				return function() {
					var qvalue = question.getOption(name[0]);
					var felem = elem[0];
					if(me.inList(felem.value,qvalue)) return "true"; else return "false";
				};
			})(name,elem);
		} else if(id == "wirisoption" && question != null) {
			var name = [this.getIndex(elem[0].id,1)];
			var formelem = elem[0];
			controller[0].setQuestionValue = (function(name) {
				return function(value) {
					if(name[0] == com.wiris.quizzes.Option.OPTION_TOLERANCE) value = "10^(-" + value + ")";
					question.setOption(name[0],value);
				};
			})(name);
			controller[0].getQuestionValue = (function(name) {
				return function() {
					var value = question.getOption(name[0]);
					if(name[0] == com.wiris.quizzes.Option.OPTION_TOLERANCE) value = value.substr(5,value.length - 6);
					return value;
				};
			})(name);
		} else if(id == "wirisanswer") {
			var index = [Std.parseInt(this.getIndex(elem[0].id,1))];
			controller[0].setQuestionValue = (function(index) {
				return function(value) {
					if(instance != null) {
						if(instance.userData == null) instance.userData = new com.wiris.quizzes.UserData();
						instance.userData.setUserAnswer(index[0],value);
					}
				};
			})(index);
			controller[0].getQuestionValue = (function(index) {
				return function() {
					var value;
					if(instance != null && instance.userData != null && instance.userData.answers != null && instance.userData.answers.length > index[0]) value = instance.userData.answers[index[0]].content; else value = original.value;
					if(com.wiris.quizzes.MathContent.isEmpty(value)) value = "";
					return value;
				};
			})(index);
			controller[0].updateInterface = (function(elem) {
				return function(value) {
					if(!com.wiris.quizzes.JsQuizzesFilter.hasClass(elem[0],com.wiris.quizzes.JsQuizzesFilter.CLASS_QUESTION) && !com.wiris.quizzes.JsQuizzesFilter.hasClass(elem[0],com.wiris.quizzes.JsQuizzesFilter.CLASS_QUESTION_INSTANCE)) original.value = value;
				};
			})(elem);
		} else if(id == "wiristablink") {
			var tabname = [this.getMainId(this.getIndex(elem[0].id,1))];
			controller[0].updateInterface = (function(tabname) {
				return function(value) {
					me.setPopupActiveTab(tabname[0]);
				};
			})(tabname);
		} else if(id == "wirisrestartbutton") controller[0].updateInterface = (function(elem) {
			return function(value) {
				var caDiv = me.getNearestElementByClassName(elem[0],"wiristestcorrectanswer");
				var caIndex = Std.parseInt(me.getIndex(caDiv.id,1));
				if(instance.userData == null) instance.userData = new com.wiris.quizzes.UserData();
				instance.userData.randomSeed = Std.random(65536);
				if(question.wirisCasSession != null && question.correctAnswers != null && question.correctAnswers.length > caIndex) {
					var caDef = question.correctAnswers[caIndex].content;
					var req = com.wiris.quizzes.RequestBuilder.getInstance().newVariablesRequest(caDef,question,instance);
					try {
						instance.update(me.getService().execute(req));
					} catch( e ) {
						if(me.currentPopup != null) me.currentPopup.alert(e); else js.Lib.alert(e);
					}
				}
				var dynamicDiv = me.getNearestElementByClassName(elem[0],"wiristestdynamic");
				dynamicDiv.innerHTML = me.htmlgui.getWirisTestDynamic(question,instance,caIndex,1);
				var elems = elem[0].parentNode.getElementsByTagName("input");
				var j;
				var _g2 = 0, _g1 = elems.length;
				while(_g2 < _g1) {
					var j1 = _g2++;
					if(me.getMainId(elems[j1].id) == "wiristestbutton") {
						var testbutton = elems[j1];
						testbutton.disabled = false;
					}
				}
			};
		})(elem); else if(id == "wiristestbutton") {
			var felem = elem[0];
			felem.disabled = true;
			controller[0].updateInterface = (function(elem) {
				return function(value) {
					var caDiv = me.getNearestElementByClassName(elem[0],"wiristestcorrectanswer");
					var caIndex = Std.parseInt(me.getIndex(caDiv.id,1));
					var uaDiv = me.getNearestElementByClassName(elem[0],"wiristestanswer");
					var uaElem = uaDiv.getElementsByTagName("textarea")[0];
					var uaDef = uaElem.value;
					if(question.correctAnswers != null && question.correctAnswers.length > caIndex && !com.wiris.quizzes.MathContent.isEmpty(question.correctAnswers[caIndex].content) && !com.wiris.quizzes.MathContent.isEmpty(uaDef)) {
						var userAnswers = new Array();
						userAnswers.push(uaDef);
						var correctAnswers = new Array();
						var j;
						var _g1 = 0;
						while(_g1 < caIndex) {
							var j1 = _g1++;
							correctAnswers.push("");
						}
						correctAnswers.push(question.correctAnswers[caIndex].content);
						var req = com.wiris.quizzes.RequestBuilder.getInstance().newEvalMultipleAnswersRequest(correctAnswers,userAnswers,question,instance);
						try {
							instance.update(me.getService().execute(req));
						} catch( e ) {
							if(me.currentPopup != null) me.currentPopup.alert(e); else js.Lib.alert(e);
						}
					} else instance.clearChecks();
					var dynamicDiv = me.getNearestElementByClassName(elem[0],"wiristestdynamic");
					dynamicDiv.innerHTML = me.htmlgui.getWirisTestDynamic(question,instance,caIndex,1);
				};
			})(elem);
		} else if(id == "wirislocaldata") {
			var name = [this.getIndex(elem[0].id,1)];
			var felem = [elem[0]];
			controller[0].setQuestionValue = (function(felem,name) {
				return function(value) {
					if(felem[0].type == "checkbox") {
						if(value == "true") question.setLocalData(name[0],felem[0].value); else question.removeLocalData(name[0]);
					} else if(felem[0].type == "radio") {
						if(value == "true") question.setLocalData(name[0],felem[0].value);
					} else question.setLocalData(name[0],value);
				};
			})(felem,name);
			controller[0].getQuestionValue = (function(felem,name) {
				return function() {
					var value = question.getLocalData(name[0]);
					if(felem[0].type == "checkbox" || felem[0].type == "radio") value = Std.string(value == felem[0].value);
					return value;
				};
			})(felem,name);
			controller[0].updateInterface = (function(name,elem) {
				return function(value) {
					if(name[0] == com.wiris.quizzes.LocalData.KEY_SHOW_CAS) {
						var buttonId = "wirisinitialcontentbutton" + me.getUniqueNumber(elem[0].id);
						var elemDoc = elem[0].ownerDocument;
						var button = elemDoc.getElementById(buttonId);
						button.disabled = value != "true";
					}
				};
			})(name,elem);
		} else if(id == "wirisinitialcontentbutton") controller[0].updateInterface = (function(controller,elem) {
			return function(value) {
				if(controller[0].popup == null || controller[0].popup.closed) {
					var currentWindow = com.wiris.quizzes.JsInputController.getElementWindow(elem[0]);
					var newWindow = currentWindow.open("","wirisquizzesinitialcascontent","status=no,toolbar=no,location=no,menubar=no,directories=no,scrollbars=no,resizable=yes,width=700,height=500");
					controller[0].popup = newWindow;
					var setupWindow = (function() {
						return function() {
							var auxQuestion = new com.wiris.quizzes.Question();
							auxQuestion.setLocalData(com.wiris.quizzes.LocalData.KEY_CAS_INITIAL_SESSION,question.getLocalData(com.wiris.quizzes.LocalData.KEY_CAS_INITIAL_SESSION));
							var applet = newWindow.document.getElementsByTagName("applet")[0];
							var casController = new com.wiris.quizzes.JsInputController(applet,auxQuestion,null,null,null);
							casController.setQuestionValue = (function() {
								return function(value1) {
									if(me.isEmptyWirisCasSession(value1)) auxQuestion.removeLocalData(com.wiris.quizzes.LocalData.KEY_CAS_INITIAL_SESSION); else auxQuestion.setLocalData(com.wiris.quizzes.LocalData.KEY_CAS_INITIAL_SESSION,value1);
								};
							})();
							casController.getQuestionValue = (function() {
								return function() {
									var value1 = auxQuestion.getLocalData(com.wiris.quizzes.LocalData.KEY_CAS_INITIAL_SESSION);
									if(value1 == null || value1 == "") value1 = me.getEmptyWirisCasSession(applet,false);
									return value1;
								};
							})();
							var inputs = newWindow.document.getElementsByTagName("input");
							var j;
							var _g2 = 0, _g1 = inputs.length;
							while(_g2 < _g1) {
								var j1 = _g2++;
								var input = inputs[j1];
								if(me.getMainId(input.id) == "wirisacceptbutton") com.wiris.quizzes.JsInputController.addEvent(input,"click",(function() {
									return function() {
										casController.updateInputValue();
										var value1 = auxQuestion.getLocalData(com.wiris.quizzes.LocalData.KEY_CAS_INITIAL_SESSION);
										if(value1 != null) question.setLocalData(com.wiris.quizzes.LocalData.KEY_CAS_INITIAL_SESSION,value1); else question.removeLocalData(com.wiris.quizzes.LocalData.KEY_CAS_INITIAL_SESSION);
										newWindow.close();
									};
								})()); else if(me.getMainId(input.id) == "wiriscancelbutton") com.wiris.quizzes.JsInputController.addEvent(input,"click",(function() {
									return function() {
										newWindow.close();
									};
								})());
							}
							com.wiris.quizzes.JsInputController.addEvent(newWindow,"unload",$closure(casController,"term"));
							casController.init();
						};
					})();
					currentWindow.setupInitialContentWindow = setupWindow;
					var t = new haxe.Timer(100);
					t.run = (function() {
						return function() {
							t.stop();
							newWindow.document.writeln("<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\">");
							newWindow.document.writeln("<html><head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\"/><title>WIRIS quizzes - initial WIRIS CAS content</title>");
							newWindow.document.writeln("<link rel=\"stylesheet\" type=\"text/css\" href=\"" + com.wiris.quizzes.QuizzesConfig.QUIZZES_RESOURCES_URL + "/wirisquizzes.css\" />");
							newWindow.document.writeln("</head><body onload=\"window.opener.setupInitialContentWindow();\">");
							newWindow.document.writeln(me.htmlgui.printEditCasInitialContent(question));
							newWindow.document.writeln("</body></html>");
							newWindow.document.close();
						};
					})();
				}
				controller[0].popup.focus();
			};
		})(controller,elem); else if(id == "wirisalgorithmlanguage") {
			controller[0].updateInterface = (function(controller) {
				return function(value) {
					if(controller[0].getQuestionValue() != value) {
						var applet = me.htmlgui.getWirisCasApplet(me.appletController.element.id,value);
						var wrapper = me.appletController.element.parentNode;
						wrapper.innerHTML = applet;
						me.addBehaviors(wrapper,question,questionElement,instance,instanceElement,original);
					}
				};
			})(controller);
			controller[0].getQuestionValue = (function() {
				return function() {
					var lang = "en";
					if(question.wirisCasSession != null) lang = me.htmlgui.getLangFromCasSession(question.wirisCasSession);
					return lang;
				};
			})();
		}
		controller[0].init();
		this.controllers.push(controller[0]);
	}
}
com.wiris.quizzes.JsQuizzesFilter.prototype.getAllPartsValue = function(elem) {
	var elemDoc = elem.ownerDocument;
	var paramid = elem.id.substr(0,elem.id.lastIndexOf("["));
	var j = 0;
	var valueArray = new Array();
	var parampart;
	do {
		parampart = elemDoc.getElementById(paramid + "[" + j + "]");
		if(parampart != null) {
			if((parampart.type == "checkbox" || parampart.type == "radio") && parampart.checked || parampart.type == "text") valueArray = this.concatSet(valueArray,this.compoundParamToArray(parampart.value));
		}
		j++;
	} while(parampart != null);
	return valueArray.join(", ");
}
com.wiris.quizzes.JsQuizzesFilter.prototype.arrayDiff = function(a,b) {
	var _g = 0;
	while(_g < b.length) {
		var elem = b[_g];
		++_g;
		a.remove(elem);
	}
	return a;
}
com.wiris.quizzes.JsQuizzesFilter.prototype.concatSet = function(a,b) {
	var _g = 0;
	while(_g < b.length) {
		var elem = b[_g];
		++_g;
		if(!this.inArray(elem,a)) a.push(elem);
	}
	return a;
}
com.wiris.quizzes.JsQuizzesFilter.prototype.equalList = function(a,b) {
	if(a == b) return true;
	var aarray = this.compoundParamToArray(a);
	var barray = this.compoundParamToArray(b);
	if(aarray.length != barray.length) return false;
	var _g = 0;
	while(_g < aarray.length) {
		var elem = aarray[_g];
		++_g;
		if(!this.inArray(elem,barray)) return false;
	}
	return true;
}
com.wiris.quizzes.JsQuizzesFilter.prototype.inList = function(sub,all) {
	var allarray = this.compoundParamToArray(all);
	var subarray = this.compoundParamToArray(sub);
	var _g = 0;
	while(_g < subarray.length) {
		var elem = subarray[_g];
		++_g;
		if(!this.inArray(elem,allarray)) return false;
	}
	return true;
}
com.wiris.quizzes.JsQuizzesFilter.prototype.compoundParamToArray = function(value) {
	if(StringTools.trim(value).length == 0) return new Array();
	var array = value.split(",");
	var i;
	var _g1 = 0, _g = array.length;
	while(_g1 < _g) {
		var i1 = _g1++;
		array[i1] = StringTools.trim(array[i1]);
	}
	return array;
}
com.wiris.quizzes.JsQuizzesFilter.prototype.computeCompoundParam = function(old,part,add) {
	var oldelems = this.compoundParamToArray(old);
	var partelems = this.compoundParamToArray(part);
	if(add) {
		var _g = 0;
		while(_g < partelems.length) {
			var partelem = partelems[_g];
			++_g;
			if(!this.inArray(partelem,oldelems)) oldelems.push(partelem);
		}
	} else {
		var _g = 0;
		while(_g < partelems.length) {
			var partelem = partelems[_g];
			++_g;
			oldelems.remove(partelem);
		}
	}
	return oldelems.join(", ");
}
com.wiris.quizzes.JsQuizzesFilter.prototype.inArray = function(value,array) {
	var elem;
	var _g = 0;
	while(_g < array.length) {
		var elem1 = array[_g];
		++_g;
		if(value == elem1) return true;
	}
	return false;
}
com.wiris.quizzes.JsQuizzesFilter.prototype.getMainId = function(id) {
	if(id == null) return null;
	var sb = new StringBuf();
	var i = 0;
	while(i < id.length && (id.charCodeAt(i) >= 65 && id.charCodeAt(i) <= 90) || id.charCodeAt(i) >= 97 && id.charCodeAt(i) <= 122) {
		sb.add(id.charAt(i));
		i++;
	}
	return sb.b.join("");
}
com.wiris.quizzes.JsQuizzesFilter.prototype.getIndex = function(id,position) {
	var start = 0;
	var i = 0;
	var _g = 0;
	while(_g < position) {
		var i1 = _g++;
		start = id.indexOf("[",start) + 1;
	}
	return id.substr(start,id.indexOf("]",start) - start);
}
com.wiris.quizzes.JsQuizzesFilter.prototype.getUniqueNumber = function(id) {
	var start = this.getMainId(id).length;
	var end = id.indexOf("[");
	if(end == -1) return id.substr(start); else return id.substr(start,end - start);
}
com.wiris.quizzes.JsQuizzesFilter.prototype.getEmptyWirisCasSession = function(elem,library) {
	var lang = "en";
	var code = elem.getAttribute("code");
	if(code != null) lang = code.substr(code.length - 2);
	var session = "<session lang=\"" + lang + "\" version=\"2.0\">";
	if(library) session += "<library closed=\"false\"><mtext style=\"color:#ffc800\" xml:lang=\"" + lang + "\">variables</mtext>";
	session += "<group><command><input><math xmlns=\"http://www.w3.org/1998/Math/MathML\"/></input></command></group>";
	if(library) session += "</library>";
	session += "</session>";
	return session;
}
com.wiris.quizzes.JsQuizzesFilter.prototype.isEmptyWirisCasSession = function(session) {
	return session.indexOf("<mo") == -1 && session.indexOf("<mi") == -1 && session.indexOf("<mn") == -1 && session.indexOf("<csymbol") == -1;
}
com.wiris.quizzes.JsQuizzesFilter.prototype.filterHtml = function() {
	this.filterControlClass(com.wiris.quizzes.JsQuizzesFilter.CLASS_AUTHOR_FIELD);
	this.filterControlClass(com.wiris.quizzes.JsQuizzesFilter.CLASS_ANSWER_FIELD);
	this.filterMathInputs();
	this.filterEditors();
}
com.wiris.quizzes.JsQuizzesFilter.prototype.addFormSubmitHandlers = function(element,handler) {
	var forms = element.getElementsByTagName("form");
	var i;
	var _g1 = 0, _g = forms.length;
	while(_g1 < _g) {
		var i1 = _g1++;
		com.wiris.quizzes.JsInputController.addEvent(forms[i1],"submit",handler);
	}
}
com.wiris.quizzes.JsQuizzesFilter.prototype.formSubmitHandler = function() {
	var _g = 0, _g1 = this.controllers;
	while(_g < _g1.length) {
		var controller = _g1[_g];
		++_g;
		controller.saveInputValue();
		controller.hideElementValue();
	}
	var ids = this.questions.keys();
	while(ids.hasNext()) {
		var id = ids.next();
		var element = js.Lib.document.getElementById(id);
		var question = this.questions.get(id);
		var xml = question.serialize();
		element.value = xml;
	}
	var ids1 = this.instances.keys();
	while(ids1.hasNext()) {
		var id = ids1.next();
		var element = js.Lib.document.getElementById(id);
		var instance = this.instances.get(id);
		var xml = instance.serialize();
		element.value = xml;
	}
}
com.wiris.quizzes.JsQuizzesFilter.prototype.popupSubmitHandler = function(popupQuestion,mainQuestion,popupQuestionElement,mainQuestionElement,popupInstance,mainInstance,popupInstanceElement,mainInstanceElement,popupOriginal,mainOriginal) {
	var i;
	var _g1 = 0, _g = this.controllers.length;
	while(_g1 < _g) {
		var i1 = _g1++;
		var controller = this.controllers[i1];
		var elemDoc = controller.element.ownerDocument;
		if(elemDoc == this.currentPopup.document) controller.saveInputValue();
	}
	if(mainQuestionElement != null) this.questions.set(mainQuestionElement.id,popupQuestion); else this.defaultQuestion = popupQuestion;
	if(mainInstanceElement != null) this.instances.set(mainInstanceElement.id,popupInstance); else this.defaultInstance = popupInstance;
	if(com.wiris.quizzes.JsQuizzesFilter.DEBUG) {
		if(mainQuestionElement != null && popupQuestion != null) mainQuestionElement.value = popupQuestion.serialize();
		if(mainInstanceElement != null && popupInstance != null) mainInstanceElement.value = popupInstance.serialize();
	}
	this.popupCancelHandler();
	var elemId = this.getMainId(mainOriginal.id);
	var index = Std.parseInt(this.getIndex(mainOriginal.id,1));
	var className = null;
	if(elemId == "wiriscorrectanswer") className = com.wiris.quizzes.JsQuizzesFilter.CLASS_AUTHOR_FIELD; else if(elemId == "wirisanswer") className = com.wiris.quizzes.JsQuizzesFilter.CLASS_ANSWER_FIELD;
	if(className != null) {
		var elements = com.wiris.quizzes.JsQuizzesFilter.getElementsByClassName(className);
		var i1;
		var _g1 = 0, _g = elements.length;
		while(_g1 < _g) {
			var i2 = _g1++;
			var felem = elements[i2];
			if(index == i2) felem.value = popupOriginal.value;
			var div = felem.parentNode;
			div.parentNode.replaceChild(felem,div);
			com.wiris.quizzes.JsQuizzesFilter.removeClass(felem,"wirisprocessed");
		}
		this.filterControlClass(className);
		this.filterMathInputs();
	}
}
com.wiris.quizzes.JsQuizzesFilter.prototype.popupCancelHandler = function() {
	if(this.currentPopup == null) return;
	var n = this.controllers.length - 1;
	while(n >= 0) {
		var controller = this.controllers[n];
		var elemDoc = controller.element.ownerDocument;
		if(elemDoc == this.currentPopup.document) {
			this.controllers.remove(controller);
			if(controller == this.appletController) this.appletController = null;
			controller.term();
		}
		n--;
	}
	if(this.currentPopup != null && !this.currentPopup.closed) this.currentPopup.close();
	this.currentPopup = null;
}
com.wiris.quizzes.JsQuizzesFilter.prototype.addButtonHandler = function(id,elem,handler) {
	var elems = elem.getElementsByTagName("input");
	var i;
	var _g1 = 0, _g = elems.length;
	while(_g1 < _g) {
		var i1 = _g1++;
		var input = elems[i1];
		if(input.type.toLowerCase() == "button") {
			if(this.getMainId(input.id) == id) com.wiris.quizzes.JsInputController.addEvent(input,"click",handler);
		}
	}
}
com.wiris.quizzes.JsQuizzesFilter.prototype.setPopupActiveTab = function(tabname) {
	var tabcontents = com.wiris.quizzes.JsQuizzesFilter.getElementsByClassName("wiristabcontent","div",this.currentPopup.document);
	var i = 0;
	var _g1 = 0, _g = tabcontents.length;
	while(_g1 < _g) {
		var i1 = _g1++;
		var div = tabcontents[i1];
		var divTabname = this.getMainId(this.getIndex(div.id,1));
		if(divTabname == tabname) {
			com.wiris.quizzes.JsQuizzesFilter.removeClass(div,"wirishidden");
			com.wiris.quizzes.JsQuizzesFilter.addClass(div,"wirisselected");
			if(divTabname == "wirisvariablestab" && this.appletController != null) this.appletController.init();
		} else {
			if(divTabname == "wirisvariablestab" && com.wiris.quizzes.JsQuizzesFilter.hasClass(div,"wirisselected") && this.appletController != null) this.appletController.saveInputValue();
			com.wiris.quizzes.JsQuizzesFilter.removeClass(div,"wirisselected");
			com.wiris.quizzes.JsQuizzesFilter.addClass(div,"wirishidden");
		}
	}
	var tablinks = com.wiris.quizzes.JsQuizzesFilter.getElementsByClassName("wiristablink","a",this.currentPopup.document);
	var _g1 = 0, _g = tablinks.length;
	while(_g1 < _g) {
		var i1 = _g1++;
		var anchor = tablinks[i1];
		var linkName = this.getMainId(this.getIndex(anchor.id,1));
		if(linkName == tabname) com.wiris.quizzes.JsQuizzesFilter.addClass(anchor,"wirisselected"); else com.wiris.quizzes.JsQuizzesFilter.removeClass(anchor,"wirisselected");
	}
	var helps = com.wiris.quizzes.JsQuizzesFilter.getElementsByClassName("wiristabhelp","div",this.currentPopup.document);
	var _g1 = 0, _g = helps.length;
	while(_g1 < _g) {
		var i1 = _g1++;
		var help = helps[i1];
		var helpTabname = this.getMainId(this.getIndex(help.id,1));
		if(helpTabname == tabname) com.wiris.quizzes.JsQuizzesFilter.removeClass(help,"wirishidden"); else com.wiris.quizzes.JsQuizzesFilter.addClass(help,"wirishidden");
	}
}
com.wiris.quizzes.JsQuizzesFilter.prototype.filterMathInputs = function() {
	var me = this;
	var elements = com.wiris.quizzes.JsQuizzesFilter.getElementsByClassName(com.wiris.quizzes.JsQuizzesFilter.CLASS_MATHINPUT);
	var i;
	var _g1 = 0, _g = elements.length;
	while(_g1 < _g) {
		var i1 = _g1++;
		var element = [elements[i1]];
		if(!com.wiris.quizzes.JsQuizzesFilter.hasClass(element[0],"wirisprocessed")) {
			var type = [this.getIndex(element[0].id,1)];
			var index = [Std.parseInt(this.getIndex(element[0].id,2))];
			var anchors = com.wiris.quizzes.JsQuizzesFilter.getElementsByClassName("wirispopuplink","a",element[0]);
			var original = [element[0].getElementsByTagName("input")[0]];
			var j;
			var _g3 = 0, _g2 = anchors.length;
			while(_g3 < _g2) {
				var j1 = _g3++;
				var anchor = anchors[j1];
				var handler = (function(original,index,type,element) {
					return function() {
						if(me.currentPopup == null || me.currentPopup.closed) {
							var questionElement = me.getNearestElementByClassName(element[0],com.wiris.quizzes.JsQuizzesFilter.CLASS_QUESTION);
							var question = me.getQuestionObject(questionElement);
							var instanceElement = me.getNearestElementByClassName(element[0],com.wiris.quizzes.JsQuizzesFilter.CLASS_QUESTION_INSTANCE);
							var instance = me.getInstanceObject(instanceElement);
							me.currentPopup = js.Lib.window.open("","wirisquizzes","status=no,toolbar=no,location=no,menubar=no,directories=no,scrollbars=no,resizable=yes,width=800,height=600");
							var me1 = me;
							var setupWindow = (function(original) {
								return function() {
									var newQuestionElement = me.currentPopup.document.getElementById("wirisquestioncopy");
									newQuestionElement.value = question.serialize();
									var newQuestion = com.wiris.quizzes.RequestBuilder.getInstance().readQuestion(newQuestionElement.value);
									var newInstanceElement = me.currentPopup.document.getElementById("wirisinstancecopy");
									newInstanceElement.value = instance.serialize();
									var newInstance = com.wiris.quizzes.RequestBuilder.getInstance().readQuestionInstance(newInstanceElement.value);
									var newOriginal = me.currentPopup.document.getElementById("wirisoriginalcopy");
									newOriginal.value = original[0].value;
									me1.addBehaviors(me.currentPopup.document,newQuestion,newQuestionElement,newInstance,newInstanceElement,newOriginal);
									me1.filterEditors(me.currentPopup);
									me1.addButtonHandler("wirisacceptbutton",me.currentPopup.document,(function(original) {
										return function() {
											me1.popupSubmitHandler(newQuestion,question,newQuestionElement,questionElement,newInstance,instance,newInstanceElement,instanceElement,newOriginal,original[0]);
										};
									})(original));
									me1.addButtonHandler("wiriscancelbutton",me.currentPopup.document,(function() {
										return function() {
											me.currentPopup.close();
										};
									})());
									if(com.wiris.quizzes.JsQuizzesFilter.hasClass(original[0],"wirismultichoice")) me1.setPopupActiveTab("wirisvariablestab"); else me1.setPopupActiveTab("wiriscorrectanswertab");
								};
							})(original);
							js.Lib.window.setupPopupWindow = setupWindow;
							var t = new haxe.Timer(100);
							t.run = (function(original,index,type) {
								return function() {
									t.stop();
									me.currentPopup.document.writeln("<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\">");
									me.currentPopup.document.writeln("<html><head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\"/><title>WIRIS quizzes Examples</title>");
									me.currentPopup.document.writeln("<script type=\"text/javascript\" src=\"" + com.wiris.quizzes.QuizzesConfig.EDITOR_SERVICE_URL + "/editor\"></script>");
									me.currentPopup.document.writeln("<link rel=\"stylesheet\" type=\"text/css\" href=\"" + com.wiris.quizzes.QuizzesConfig.QUIZZES_RESOURCES_URL + "/wirisquizzes.css\" />");
									me.currentPopup.document.writeln("</head>");
									me.currentPopup.document.writeln("<body onload=\"window.opener.setupPopupWindow();\"><form class=\"wirisform\" id=\"wirisform\">");
									if(type[0] == "wiriscorrectanswer") me.currentPopup.document.writeln(me.htmlgui.getCorrectAnswerInput(question,instance,index[0],true,original[0].className)); else if(type[0] == "wirisanswer") me.currentPopup.document.writeln(me.htmlgui.getUserAnswerInput(question,instance,index[0],true,original[0].className));
									me.currentPopup.document.writeln("<input id=\"wirisquestioncopy\" type=\"hidden\" />");
									me.currentPopup.document.writeln("<input id=\"wirisinstancecopy\" type=\"hidden\" />");
									me.currentPopup.document.writeln("<input id=\"wirisoriginalcopy\" type=\"hidden\" />");
									me.currentPopup.document.writeln("</form></body></html>");
									me.currentPopup.document.close();
									com.wiris.quizzes.JsInputController.addEvent(me.currentPopup,"unload",$closure(me,"popupCancelHandler"));
								};
							})(original,index,type);
						}
						me.currentPopup.focus();
					};
				})(original,index,type,element);
				com.wiris.quizzes.JsInputController.addEvent(anchor,"click",handler);
			}
			com.wiris.quizzes.JsQuizzesFilter.addClass(element[0],"wirisprocessed");
		}
	}
}
com.wiris.quizzes.JsQuizzesFilter.prototype.filterEditors = function(currentWindow) {
	if(currentWindow == null) currentWindow = js.Lib.window;
	var elements = com.wiris.quizzes.JsQuizzesFilter.getElementsByClassName(com.wiris.quizzes.JsQuizzesFilter.CLASS_EDITOR,"*",currentWindow.document);
	var i;
	var _g1 = 0, _g = elements.length;
	while(_g1 < _g) {
		var i1 = _g1++;
		var element = elements[i1];
		if(!com.wiris.quizzes.JsQuizzesFilter.hasClass(element,"wirisprocessed")) {
			var felement = element;
			var content = felement.value;
			var lang = element.lang;
			var params = { };
			params.language = lang;
			var editor = currentWindow.com.wiris.jsEditor.JsEditor.newInstance(params);
			var editorElement = editor.getElement();
			var div = currentWindow.document.createElement("div");
			element.parentNode.replaceChild(div,element);
			div.appendChild(editorElement);
			div.parentNode.appendChild(element);
			element.style.display = "none";
			editorElement.style.width = "100%";
			editorElement.style.height = "100%";
			div.style.width = "100%";
			div.style.height = "100%";
			div.style.minWidth = "490px";
			div.style.minHeight = "250px";
			this.setEditorMathML(editor,content);
			var felem = element;
			var listener = new com.wiris.quizzes.JsEditorListener(felem,this.getController(element));
			editor.getEditorModel().addEditorListener(listener);
			com.wiris.quizzes.JsQuizzesFilter.addClass(element,"wirisprocessed");
		}
	}
}
com.wiris.quizzes.JsQuizzesFilter.prototype.getController = function(element) {
	var controller;
	var _g = 0, _g1 = this.controllers;
	while(_g < _g1.length) {
		var controller1 = _g1[_g];
		++_g;
		if(controller1.element == element) return controller1;
	}
	return null;
}
com.wiris.quizzes.JsQuizzesFilter.prototype.setEditorMathML = function(editor,mathml) {
	if(mathml == "") mathml = "<math/>";
	if(this.auxEditors == null) this.auxEditors = new Array();
	if(this.auxEditorsMathML == null) this.auxEditorsMathML = new Array();
	this.auxEditors.push(editor);
	this.auxEditorsMathML.push(mathml);
	this.setEditorsMathMLImpl();
}
com.wiris.quizzes.JsQuizzesFilter.prototype.setEditorsMathMLImpl = function() {
	var i = this.auxEditors.length - 1;
	while(i >= 0) {
		var editor = this.auxEditors[i];
		var mathml = this.auxEditorsMathML[i];
		try {
			if(com.wiris.quizzes.JsInputController.getElementWindow(editor.getElement()) == null) {
				this.auxEditors.remove(editor);
				this.auxEditorsMathML.remove(mathml);
			}
			if(editor.isReady()) {
				editor.setMathML(mathml);
				this.auxEditors.remove(editor);
				this.auxEditorsMathML.remove(mathml);
			}
		} catch( e ) {
			this.auxEditors.remove(editor);
			this.auxEditorsMathML.remove(mathml);
		}
		i--;
	}
	if(this.auxEditors.length > 0 && this.editorTimer == null) {
		this.editorTimer = new haxe.Timer(200);
		this.editorTimer.run = $closure(this,"setEditorsMathMLImpl");
	} else if(this.auxEditors.length == 0 && this.editorTimer != null) {
		this.editorTimer.stop();
		this.editorTimer = null;
	}
}
com.wiris.quizzes.JsQuizzesFilter.prototype.filterControlClass = function(className) {
	var elements = com.wiris.quizzes.JsQuizzesFilter.getElementsByClassName(className);
	var i;
	var _g1 = 0, _g = elements.length;
	while(_g1 < _g) {
		var i1 = _g1++;
		var element = elements[i1];
		if(!com.wiris.quizzes.JsQuizzesFilter.hasClass(element,"wirisprocessed")) {
			var questionElement = this.getNearestElementByClassName(element,com.wiris.quizzes.JsQuizzesFilter.CLASS_QUESTION);
			var question = this.getQuestionObject(questionElement);
			var instanceElement = this.getNearestElementByClassName(element,com.wiris.quizzes.JsQuizzesFilter.CLASS_QUESTION_INSTANCE);
			var instance = this.getInstanceObject(instanceElement);
			var html = "";
			var popup = element.nodeName.toLowerCase() == "input";
			if(className == com.wiris.quizzes.JsQuizzesFilter.CLASS_AUTHOR_FIELD) {
				var felement = element;
				if(felement.value != null && felement.value.length > 0) question.setCorrectAnswer(i1,felement.value);
				html = this.htmlgui.getCorrectAnswerInput(question,instance,i1,false,element.className);
			} else if(className == com.wiris.quizzes.JsQuizzesFilter.CLASS_ANSWER_FIELD) {
				var felement = element;
				if(felement.value != null && felement.value.length > 0) instance.userData.setUserAnswer(i1,felement.value);
				html = this.htmlgui.getUserAnswerInput(question,instance,i1,false,element.className);
			}
			var div = this.replaceElementByHtml(element,html);
			div.style.width = "100%";
			div.style.height = "100%";
			this.addBehaviors(div,question,questionElement,instance,instanceElement,element);
			com.wiris.quizzes.JsQuizzesFilter.addClass(element,"wirisprocessed");
		}
	}
}
com.wiris.quizzes.JsQuizzesFilter.prototype.getQuestionObject = function(questionElement) {
	if(questionElement == null) {
		if(this.defaultQuestion == null) this.defaultQuestion = new com.wiris.quizzes.Question();
		return this.defaultQuestion;
	}
	if(questionElement.id == null) questionElement.id = this.getUniqueId("wirisquestion");
	if(!this.questions.exists(questionElement.id)) {
		var question;
		if(questionElement.value == "") question = new com.wiris.quizzes.Question(); else question = com.wiris.quizzes.RequestBuilder.getInstance().readQuestion(questionElement.value);
		this.questions.set(questionElement.id,question);
	}
	return this.questions.get(questionElement.id);
}
com.wiris.quizzes.JsQuizzesFilter.prototype.getInstanceObject = function(instanceElement) {
	if(instanceElement == null) {
		if(this.defaultInstance == null) this.defaultInstance = new com.wiris.quizzes.QuestionInstance();
		return this.defaultInstance;
	}
	if(instanceElement.id == null) instanceElement.id = this.getUniqueId("wirisquestioninstance");
	if(!this.instances.exists(instanceElement.id)) {
		var instance;
		if(instanceElement.value == "") instance = new com.wiris.quizzes.QuestionInstance(); else instance = com.wiris.quizzes.RequestBuilder.getInstance().readQuestionInstance(instanceElement.value);
		this.instances.set(instanceElement.id,instance);
	}
	return this.instances.get(instanceElement.id);
}
com.wiris.quizzes.JsQuizzesFilter.prototype.getUniqueId = function(prefix) {
	var ident = prefix + Std.random(65536);
	while(js.Lib.document.getElementById(ident) != null) ident = prefix + Std.random(65536);
	return ident;
}
com.wiris.quizzes.JsQuizzesFilter.prototype.getNearestElementByClassName = function(element,className) {
	var target = this.getChildByClassName(element,className);
	while(target == null && element.parentNode != null) {
		var brothers = element.parentNode.childNodes;
		var i = 0;
		var n = brothers.length;
		while(target == null && i < n) {
			var brother = brothers[i];
			if(element != brother) target = this.getChildByClassName(brother,className);
			i++;
		}
		element = element.parentNode;
	}
	return target;
}
com.wiris.quizzes.JsQuizzesFilter.prototype.getChildByClassName = function(element,className) {
	if(com.wiris.quizzes.JsQuizzesFilter.hasClass(element,className)) return element; else if(element.hasChildNodes()) {
		var i;
		var n = element.childNodes.length;
		var _g = 0;
		while(_g < n) {
			var i1 = _g++;
			var target = this.getChildByClassName(element.childNodes[i1],className);
			if(target != null) return target;
		}
	}
	return null;
}
com.wiris.quizzes.JsQuizzesFilter.prototype.replaceElementByHtml = function(element,html) {
	var newElement = js.Lib.document.createElement("div");
	newElement.innerHTML = html;
	element.parentNode.replaceChild(newElement,element);
	element.style.display = "none";
	newElement.appendChild(element);
	return newElement;
}
com.wiris.quizzes.JsQuizzesFilter.prototype.getService = function() {
	if(this.service == null) this.service = new com.wiris.quizzes.QuizzesService(com.wiris.quizzes.QuizzesConfig.QUIZZES_SERVICE_URL);
	return this.service;
}
com.wiris.quizzes.JsQuizzesFilter.prototype.__class__ = com.wiris.quizzes.JsQuizzesFilter;
js.Lib = function() { }
js.Lib.__name__ = ["js","Lib"];
js.Lib.isIE = null;
js.Lib.isOpera = null;
js.Lib.document = null;
js.Lib.window = null;
js.Lib.alert = function(v) {
	alert(js.Boot.__string_rec(v,""));
}
js.Lib.eval = function(code) {
	return eval(code);
}
js.Lib.setErrorHandler = function(f) {
	js.Lib.onerror = f;
}
js.Lib.prototype.__class__ = js.Lib;
StringTools = function() { }
StringTools.__name__ = ["StringTools"];
StringTools.urlEncode = function(s) {
	return encodeURIComponent(s);
}
StringTools.urlDecode = function(s) {
	return decodeURIComponent(s.split("+").join(" "));
}
StringTools.htmlEscape = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
StringTools.htmlUnescape = function(s) {
	return s.split("&gt;").join(">").split("&lt;").join("<").split("&amp;").join("&");
}
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && s.substr(0,start.length) == start;
}
StringTools.endsWith = function(s,end) {
	var elen = end.length;
	var slen = s.length;
	return slen >= elen && s.substr(slen - elen,elen) == end;
}
StringTools.isSpace = function(s,pos) {
	var c = s.charCodeAt(pos);
	return c >= 9 && c <= 13 || c == 32;
}
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return s.substr(r,l - r); else return s;
}
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return s.substr(0,l - r); else return s;
}
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
}
StringTools.rpad = function(s,c,l) {
	var sl = s.length;
	var cl = c.length;
	while(sl < l) if(l - sl < cl) {
		s += c.substr(0,l - sl);
		sl = l;
	} else {
		s += c;
		sl += cl;
	}
	return s;
}
StringTools.lpad = function(s,c,l) {
	var ns = "";
	var sl = s.length;
	if(sl >= l) return s;
	var cl = c.length;
	while(sl < l) if(l - sl < cl) {
		ns += c.substr(0,l - sl);
		sl = l;
	} else {
		ns += c;
		sl += cl;
	}
	return ns + s;
}
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
}
StringTools.hex = function(n,digits) {
	var s = "";
	var hexChars = "0123456789ABCDEF";
	do {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
	} while(n > 0);
	if(digits != null) while(s.length < digits) s = "0" + s;
	return s;
}
StringTools.fastCodeAt = function(s,index) {
	return s.cca(index);
}
StringTools.isEOF = function(c) {
	return c != c;
}
StringTools.prototype.__class__ = StringTools;
if(!com.wiris.settings) com.wiris.settings = {}
com.wiris.settings.PlatformSettings = function() { }
com.wiris.settings.PlatformSettings.__name__ = ["com","wiris","settings","PlatformSettings"];
com.wiris.settings.PlatformSettings.prototype.__class__ = com.wiris.settings.PlatformSettings;
$_ = {}
js.Boot.__res = {}
js.Boot.__init();
js["XMLHttpRequest"] = window.XMLHttpRequest?XMLHttpRequest:window.ActiveXObject?function() {
	try {
		return new ActiveXObject("Msxml2.XMLHTTP");
	} catch( e ) {
		try {
			return new ActiveXObject("Microsoft.XMLHTTP");
		} catch( e1 ) {
			throw "Unable to create XMLHttpRequest object.";
		}
	}
}:(function($this) {
	var $r;
	throw "Unable to create XMLHttpRequest object.";
	return $r;
}(this));
{
	Math.__name__ = ["Math"];
	Math.NaN = Number["NaN"];
	Math.NEGATIVE_INFINITY = Number["NEGATIVE_INFINITY"];
	Math.POSITIVE_INFINITY = Number["POSITIVE_INFINITY"];
	Math.isFinite = function(i) {
		return isFinite(i);
	};
	Math.isNaN = function(i) {
		return isNaN(i);
	};
}
{
	Xml.Element = "element";
	Xml.PCData = "pcdata";
	Xml.CData = "cdata";
	Xml.Comment = "comment";
	Xml.DocType = "doctype";
	Xml.Prolog = "prolog";
	Xml.Document = "document";
}
if(typeof(haxe_timers) == "undefined") haxe_timers = [];
{
	String.prototype.__class__ = String;
	String.__name__ = ["String"];
	Array.prototype.__class__ = Array;
	Array.__name__ = ["Array"];
	Int = { __name__ : ["Int"]};
	Dynamic = { __name__ : ["Dynamic"]};
	Float = Number;
	Float.__name__ = ["Float"];
	Bool = { __ename__ : ["Bool"]};
	Class = { __name__ : ["Class"]};
	Enum = { };
	Void = { __ename__ : ["Void"]};
}
{
	var d = Date;
	d.now = function() {
		return new Date();
	};
	d.fromTime = function(t) {
		var d1 = new Date();
		d1["setTime"](t);
		return d1;
	};
	d.fromString = function(s) {
		switch(s.length) {
		case 8:
			var k = s.split(":");
			var d1 = new Date();
			d1["setTime"](0);
			d1["setUTCHours"](k[0]);
			d1["setUTCMinutes"](k[1]);
			d1["setUTCSeconds"](k[2]);
			return d1;
		case 10:
			var k = s.split("-");
			return new Date(k[0],k[1] - 1,k[2],0,0,0);
		case 19:
			var k = s.split(" ");
			var y = k[0].split("-");
			var t = k[1].split(":");
			return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
		default:
			throw "Invalid date format : " + s;
		}
	};
	d.prototype["toString"] = function() {
		var date = this;
		var m = date.getMonth() + 1;
		var d1 = date.getDate();
		var h = date.getHours();
		var mi = date.getMinutes();
		var s = date.getSeconds();
		return date.getFullYear() + "-" + (m < 10?"0" + m:"" + m) + "-" + (d1 < 10?"0" + d1:"" + d1) + " " + (h < 10?"0" + h:"" + h) + ":" + (mi < 10?"0" + mi:"" + mi) + ":" + (s < 10?"0" + s:"" + s);
	};
	d.prototype.__class__ = d;
	d.__name__ = ["Date"];
}
{
	js.Lib.document = document;
	js.Lib.window = window;
	onerror = function(msg,url,line) {
		var f = js.Lib.onerror;
		if( f == null )
			return false;
		return f(msg,[url+":"+line]);
	}
}
com.wiris.quizzes.HTMLGuiConfig.WIRISMULTICHOICE = "wirismultichoice";
com.wiris.quizzes.HTMLGuiConfig.WIRISOPENANSWER = "wirisopenanswer";
com.wiris.quizzes.MathContent.TYPE_TEXT = "text";
com.wiris.quizzes.MathContent.TYPE_MATHML = "mathml";
com.wiris.quizzes.MathContent.TYPE_IMAGE = "image";
com.wiris.quizzes.MathContent.TYPE_STRING = "string";
com.wiris.quizzes.Option.OPTION_RELATIVE_TOLERANCE = "relative_tolerance";
com.wiris.quizzes.Option.OPTION_TOLERANCE = "tolerance";
com.wiris.quizzes.Option.OPTION_PRECISION = "precision";
com.wiris.quizzes.Option.OPTION_TIMES_OPERATOR = "times_operator";
com.wiris.quizzes.Option.OPTION_IMAGINARY_UNIT = "imaginary_unit";
com.wiris.quizzes.Option.OPTION_EXPONENTIAL_E = "exponential_e";
com.wiris.quizzes.Option.OPTION_NUMBER_PI = "number_pi";
com.wiris.quizzes.Option.OPTION_IMPLICIT_TIMES_OPERATOR = "implicit_times_operator";
com.wiris.quizzes.QuizzesService.PROTOCOL_REST = 0;
com.wiris.quizzes.Serializer.MODE_READ = 0;
com.wiris.quizzes.Serializer.MODE_WRITE = 1;
com.wiris.quizzes.Serializer.MODE_REGISTER = 2;
com.wiris.quizzes.JsInputController.DEBUG = false;
com.wiris.quizzes.JsInputController.GET = 1;
com.wiris.quizzes.JsInputController.SET = 2;
com.wiris.quizzes.LocalData.tagName = "data";
com.wiris.quizzes.LocalData.KEY_OPENANSWER_COMPOUND_ANSWER = "inputCompound";
com.wiris.quizzes.LocalData.KEY_OPENANSWER_INPUT_FIELD = "inputField";
com.wiris.quizzes.LocalData.KEY_SHOW_CAS = "cas";
com.wiris.quizzes.LocalData.KEY_CAS_INITIAL_SESSION = "casSession";
com.wiris.quizzes.LocalData.VALUE_OPENANSWER_COMPOUND_ANSWER_TRUE = "true";
com.wiris.quizzes.LocalData.VALUE_OPENANSWER_COMPOUND_ANSWER_FALSE = "false";
com.wiris.quizzes.LocalData.VALUE_OPENANSWER_INPUT_FIELD_INLINE_EDITOR = "inlineEditor";
com.wiris.quizzes.LocalData.VALUE_OPENANSWER_INPUT_FIELD_POPUP_EDITOR = "popupEditor";
com.wiris.quizzes.LocalData.VALUE_OPENANSWER_INPUT_FIELD_PLAIN_TEXT = "textField";
com.wiris.quizzes.LocalData.VALUE_SHOW_CAS_FALSE = "false";
com.wiris.quizzes.LocalData.VALUE_SHOW_CAS_ADD = "add";
com.wiris.quizzes.LocalData.VALUE_SHOW_CAS_REPLACE_INPUT = "replace";
com.wiris.quizzes.QuestionInstance.tagName = "questionInstance";
com.wiris.quizzes.QuestionResponse.tagName = "processQuestionResult";
com.wiris.quizzes.MultipleQuestionResponse.tagName = "processQuestionsResult";
com.wiris.quizzes.HTMLGui.id = 0;
com.wiris.quizzes.Assertion.tagName = "assertion";
com.wiris.quizzes.Assertion.SYNTAX_EXPRESSION = "syntax_expression";
com.wiris.quizzes.Assertion.SYNTAX_QUANTITY = "syntax_quantity";
com.wiris.quizzes.Assertion.SYNTAX_LIST = "syntax_list";
com.wiris.quizzes.Assertion.EQUIVALENT_SYMBOLIC = "equivalent_symbolic";
com.wiris.quizzes.Assertion.EQUIVALENT_LITERAL = "equivalent_literal";
com.wiris.quizzes.Assertion.EQUIVALENT_SET = "equivalent_set";
com.wiris.quizzes.Assertion.EQUIVALENT_FUNCTION = "equivalent_function";
com.wiris.quizzes.Assertion.CHECK_INTEGER_FORM = "check_integer_form";
com.wiris.quizzes.Assertion.CHECK_FRACTION_FORM = "check_fraction_form";
com.wiris.quizzes.Assertion.CHECK_POLYNOMIAL_FORM = "check_polynomial_form";
com.wiris.quizzes.Assertion.CHECK_RATIONAL_FUNCTION_FORM = "check_rational_function_form";
com.wiris.quizzes.Assertion.CHECK_ELEMENTAL_FUNCTION_FORM = "check_elemental_function_form";
com.wiris.quizzes.Assertion.CHECK_SCIENTIFIC_NOTATION = "check_scientific_notation";
com.wiris.quizzes.Assertion.CHECK_SIMPLIFIED = "check_simplified";
com.wiris.quizzes.Assertion.CHECK_EXPANDED = "check_expanded";
com.wiris.quizzes.Assertion.CHECK_FACTORIZED = "check_factorized";
com.wiris.quizzes.Assertion.CHECK_NO_COMMON_FACTOR = "check_no_common_factor";
com.wiris.quizzes.Assertion.CHECK_DIVISIBLE = "check_divisible";
com.wiris.quizzes.Assertion.CHECK_COMMON_DENOMINATOR = "check_common_denominator";
com.wiris.quizzes.Assertion.CHECK_UNIT = "check_unit";
com.wiris.quizzes.Assertion.CHECK_UNIT_LITERAL = "check_unit_literal";
com.wiris.quizzes.Assertion.CHECK_NO_MORE_DECIMALS = "check_no_more_decimals";
com.wiris.quizzes.Assertion.CHECK_NO_MORE_DIGITS = "check_no_more_digits";
com.wiris.quizzes.Assertion.syntactic = [com.wiris.quizzes.Assertion.SYNTAX_EXPRESSION,com.wiris.quizzes.Assertion.SYNTAX_QUANTITY,com.wiris.quizzes.Assertion.SYNTAX_LIST];
com.wiris.quizzes.Assertion.equivalent = [com.wiris.quizzes.Assertion.EQUIVALENT_SYMBOLIC,com.wiris.quizzes.Assertion.EQUIVALENT_LITERAL,com.wiris.quizzes.Assertion.EQUIVALENT_SET,com.wiris.quizzes.Assertion.EQUIVALENT_FUNCTION];
com.wiris.quizzes.Assertion.structure = [com.wiris.quizzes.Assertion.CHECK_INTEGER_FORM,com.wiris.quizzes.Assertion.CHECK_FRACTION_FORM,com.wiris.quizzes.Assertion.CHECK_POLYNOMIAL_FORM,com.wiris.quizzes.Assertion.CHECK_RATIONAL_FUNCTION_FORM,com.wiris.quizzes.Assertion.CHECK_ELEMENTAL_FUNCTION_FORM,com.wiris.quizzes.Assertion.CHECK_SCIENTIFIC_NOTATION];
com.wiris.quizzes.Assertion.checks = [com.wiris.quizzes.Assertion.CHECK_SIMPLIFIED,com.wiris.quizzes.Assertion.CHECK_EXPANDED,com.wiris.quizzes.Assertion.CHECK_FACTORIZED,com.wiris.quizzes.Assertion.CHECK_NO_COMMON_FACTOR,com.wiris.quizzes.Assertion.CHECK_DIVISIBLE,com.wiris.quizzes.Assertion.CHECK_COMMON_DENOMINATOR,com.wiris.quizzes.Assertion.CHECK_UNIT,com.wiris.quizzes.Assertion.CHECK_UNIT_LITERAL,com.wiris.quizzes.Assertion.CHECK_NO_MORE_DECIMALS,com.wiris.quizzes.Assertion.CHECK_NO_MORE_DIGITS];
com.wiris.quizzes.QuestionRequest.tagName = "processQuestion";
com.wiris.quizzes.UserData.tagName = "userData";
Xml.enode = new EReg("^<([a-zA-Z0-9:_-]+)","");
Xml.ecdata = new EReg("^<!\\[CDATA\\[","i");
Xml.edoctype = new EReg("^<!DOCTYPE ","i");
Xml.eend = new EReg("^</([a-zA-Z0-9:_-]+)>","");
Xml.epcdata = new EReg("^[^<]+","");
Xml.ecomment = new EReg("^<!--","");
Xml.eprolog = new EReg("^<\\?[^\\?]+\\?>","");
Xml.eattribute = new EReg("^\\s*([a-zA-Z0-9:_-]+)\\s*=\\s*([\"'])([^\\2]*?)\\2","");
Xml.eclose = new EReg("^[ \r\n\t]*(>|(/>))","");
Xml.ecdata_end = new EReg("\\]\\]>","");
Xml.edoctype_elt = new EReg("[\\[|\\]>]","");
Xml.ecomment_end = new EReg("-->","");
com.wiris.quizzes.CorrectAnswer.tagName = "correctAnswer";
com.wiris.quizzes.ProcessGetCheckAssertions.tagName = "getCheckAssertions";
com.wiris.quizzes.ProcessGetVariables.tagName = "getVariables";
com.wiris.quizzes.AssertionParam.tagName = "param";
com.wiris.quizzes.Question.tagName = "question";
com.wiris.quizzes.Translator.ES = [];
com.wiris.quizzes.Translator.EN = [["comparison","Comparison"],["properties","Properties"],["hasalgorithm","Has algorithm"],["comparisonwithstudentanswer","Comparison with student answer"],["otheracceptedanswers","Other accepted answers"],["equivalent_literal","Literally equal"],["equivalent_literal_correct_feedback","The answer is equal to the correct one."],["equivalent_literal_incorrect_feedback","The answer is not literally equal to the correct one."],["equivalent_symbolic","Mathematically equal"],["equivalent_symbolic_correct_feedback","The answer is mathematically equal to the correct one."],["equivalent_symbolic_incorrect_feedback","The answer is not equivalent to the correct one."],["equivalent_set","Equal as sets"],["equivalent_set_correct_feedback","The answer set is equal to the correct one."],["equivalent_set_incorrect_feedback","The answer set is not equivalent to the correct one."],["equivalent_function","Grading function"],["equivalent_function_correct_feedback","The answer is correct."],["any","any"],["additionalproperties","Additional properties"],["structure:","Structure:"],["none","none"],["check_integer_form","has integer form"],["check_integer_form_correct_feedback","The answer is an integer."],["check_integer_form_incorrect_feedback","The answer is not a single integer."],["check_fraction_form","has fraction form"],["check_fraction_form_correct_feedback","The answer is a fraction."],["check_fraction_form_incorrect_feedback","The answer is not a fraction."],["check_polynomial_form","has polynomial form"],["check_polynomial_form_correct_feedback","The answer is a polynomial."],["check_polynomial_form_incorrect_feedback","The answer is not a polynomial."],["check_rational_function_form","has rational function form"],["check_rational_function_form_correct_feedback","The answer is a rational function."],["check_rational_function_form_incorrect_feedback","The answer is not a rational function."],["check_elemental_function_form","is a combination of elemental functions"],["check_elemental_function_form_correct_feedback","The answer is an elemental expression."],["check_elemental_function_form_incorrect_feedback","The answer contains some non elemental function."],["check_scientific_notation","is in scientific notation"],["check_scientific_notation_correct_feedback","The answer is expressed in scientific notation."],["check_scientific_notation_incorrect_feedback","The answer is not in standard scientific notation."],["more:","More:"],["check_simplified","is simplified"],["check_simplified_correct_feedback","The answer is simplified."],["check_simplified_incorrect_feedback","The answer is not simplified."],["check_expanded","is expanded"],["check_expanded_correct_feedback","The answer is expanded."],["check_expanded_incorrect_feedback","The answer is not expanded."],["check_factorized","is factorized"],["check_factorized_correct_feedback","The answer is factorized."],["check_factorized_incorrect_feedback","The answer is not factorized."],["check_no_common_factor","doesn't have common factors"],["check_no_common_factor_correct_feedback","The answer doesn't have common factors."],["check_no_common_factor_incorrect_feedback","The answer has a common factor."],["check_divisible","is divisible by"],["check_divisible_correct_feedback","The answer is divisible by ${value}."],["check_divisible_incorrect_feedback","The answer is not divisible by ${value}."],["check_common_denominator","has a single common denominator"],["check_common_denominator_correct_feedback","The answer has a single common denominator."],["check_common_denominator_incorrect_feedback","The answer has not a single common denominator."],["check_unit","has unit equal to"],["check_unit_correct_feedback","The answer unit is ${unit}."],["check_unit_incorrect_feedback","The answer unit is not ${unit}."],["check_unit_literal","has unit literally equal to"],["check_unit_literal_correct_feedback","The answer unit is ${unit}."],["check_unit_literal_incorrect_feedback","The answer unit is not literally ${unit}."],["check_no_more_decimals","has less or equal decimals than"],["check_no_more_decimals_correct_feedback","The answer has ${digits} or less decimals."],["check_no_more_decimals_incorrect_feedback","The answer has more than ${digits} decimals."],["check_no_more_digits","has less or equal digits than"],["check_no_more_digits_correct_feedback","The answer has ${digits} or less digits."],["check_no_more_digits_incorrect_feedback","The answer has more than ${digits} digits."],["syntax_expression","General"],["syntax_expression_description","(formulas, expressions, equations, matrices...)"],["syntax_expression_correct_feedback","The answer syntax is correct."],["syntax_expression_incorrect_feedback","The answer syntax is incorrect."],["syntax_quantity","Quantity"],["syntax_quantity_description","(numbers, measure units, fractions, mixed fractions...)"],["syntax_quantity_correct_feedback","The answer syntax is correct."],["syntax_quantity_incorrect_feedback","The answer syntax is incorrect."],["syntax_list","List"],["syntax_list_description","(lists without comma separator or brackets)"],["syntax_list_correct_feedback","The answer syntax is correct."],["syntax_list_incorrect_feedback","The answer syntax is incorrect."],["none","none"],["edit","Edit"],["accept","Accept"],["cancel","Cancel"],["explog","exp/log"],["trigonometric","trigonometric"],["hyperbolic","hyperbolic"],["arithmetic","arithmetic"],["all","all"],["tolerance","Tolerance:"],["relative","relative"],["precision","Precision:"],["implicit_times_operator","Invisible times:"],["times_operator","Times operator:"],["imaginary_unit","Imaginary unit:"],["mixedfractions","Mixed fractions"],["constants","Constants:"],["functions","Functions:"],["userfunctions","User functions:"],["units","Units:"],["unitprefixes","Unit prefixes:"],["syntaxparams","Syntax options"],["syntaxparams_expression","Options for general"],["syntaxparams_quantity","Options for quantity"],["syntaxparams_list","Options for list"],["allowedinput","Allowed input"],["manual","Manual"],["correctanswer","Correct answer"],["variables","Variables"],["validation","Validation"],["preview","Preview"],["correctanswertabhelp","Please, input the correct answer. You will use the same input method as the student.\n" + "You will not be able to store the input until it is a valid formula.\n" + "Select also how do you want to use the formula editor to input the answer by the student"],["assertionstabhelp","Select what kind of input is expected. For example, choose between general mathematical expressions or quantities that involve measure units.\n" + "Check how the correct answer is validated against the student answer."],["variablestabhelp","Type your algorism to generate random values for your variables with WIRIS CAS.\n" + "You can also select the format of the output values"],["testtabhelp","Type the answer to simulate the possible response of a student.\n" + "You can also test the evaluation criteria, success and automatic feedback."],["start","Start"],["test","Test"],["clicktesttoevaluate","Click Test button to validate the current answer."],["correct","Correct!"],["incorrect","Incorrect!"],["inputmethod","Input method"],["compoundanswer","Compound answer"],["answerinputinlineeditor","WIRIS editor embedded"],["answerinputpopupeditor","WIRIS editor in popup"],["answerinputplaintext","Plain text input field"],["showauxiliarcas","Include auxiliar WIRIS CAS"],["initialcascontent","Initial content"],["tolerancedigits","Tolerance digits:"],["algorithmlanguage","Algorithm language:"]];
com.wiris.quizzes.ResultErrorLocation.tagName = "location";
com.wiris.util.xml.WEntities.s1 = "boxDL@02557@boxDl@02556@boxdL@02555@boxdl@02510@boxDR@02554@boxDr@02553@boxdR@02552@boxdr@0250C@boxH@02550@boxh@02500@boxHD@02566@boxHd@02564@boxhD@02565@boxhd@0252C@boxHU@02569@boxHu@02567@boxhU@02568@boxhu@02534@boxUL@0255D@boxUl@0255C@boxuL@0255B@boxul@02518@boxUR@0255A@boxUr@02559@boxuR@02558@boxur@02514@boxV@02551@boxv@02502@boxVH@0256C@boxVh@0256B@boxvH@0256A@boxvh@0253C@boxVL@02563@boxVl@02562@boxvL@02561@boxvl@02524@boxVR@02560@boxVr@0255F@boxvR@0255E@boxvr@0251C@Acy@00410@acy@00430@Bcy@00411@bcy@00431@CHcy@00427@chcy@00447@Dcy@00414@dcy@00434@Ecy@0042D@ecy@0044D@Fcy@00424@fcy@00444@Gcy@00413@gcy@00433@HARDcy@0042A@hardcy@0044A@Icy@00418@icy@00438@IEcy@00415@iecy@00435@IOcy@00401@iocy@00451@Jcy@00419@jcy@00439@Kcy@0041A@kcy@0043A@KHcy@00425@khcy@00445@Lcy@0041B@lcy@0043B@Mcy@0041C@mcy@0043C@Ncy@0041D@ncy@0043D@numero@02116@Ocy@0041E@ocy@0043E@Pcy@0041F@pcy@0043F@Rcy@00420@rcy@00440@Scy@00421@scy@00441@SHCHcy@00429@shchcy@00449@SHcy@00428@shcy@00448@SOFTcy@0042C@softcy@0044C@Tcy@00422@tcy@00442@TScy@00426@tscy@00446@Ucy@00423@ucy@00443@Vcy@00412@vcy@00432@YAcy@0042F@yacy@0044F@Ycy@0042B@ycy@0044B@YUcy@0042E@yucy@0044E@Zcy@00417@zcy@00437@ZHcy@00416@zhcy@00436@DJcy@00402@djcy@00452@DScy@00405@dscy@00455@DZcy@0040F@dzcy@0045F@GJcy@00403@gjcy@00453@Iukcy@00406@iukcy@00456@Jsercy@00408@jsercy@00458@Jukcy@00404@jukcy@00454@KJcy@0040C@kjcy@0045C@LJcy@00409@ljcy@00459@NJcy@0040A@njcy@0045A@TSHcy@0040B@tshcy@0045B@Ubrcy@0040E@ubrcy@0045E@YIcy@00407@yicy@00457@acute@000B4@breve@002D8@caron@002C7@cedil@000B8@circ@002C6@dblac@002DD@die@000A8@dot@002D9@grave@00060@macr@000AF@ogon@002DB@ring@002DA@tilde@002DC@uml@000A8@Aacute@000C1@aacute@000E1@Acirc@000C2@acirc@000E2@AElig@000C6@aelig@000E6@Agrave@000C0@agrave@000E0@Aring@000C5@aring@000E5@Atilde@000C3@atilde@000E3@Auml@000C4@auml@000E4@Ccedil@000C7@ccedil@000E7@Eacute@000C9@eacute@000E9@Ecirc@000CA@ecirc@000EA@Egrave@000C8@egrave@000E8@ETH@000D0@eth@000F0@Euml@000CB@euml@000EB@Iacute@000CD@iacute@000ED@Icirc@000CE@icirc@000EE@Igrave@000CC@igrave@000EC@Iuml@000CF@iuml@000EF@Ntilde@000D1@ntilde@000F1@Oacute@000D3@oacute@000F3@Ocirc@000D4@ocirc@000F4@Ograve@000D2@ograve@000F2@Oslash@000D8@oslash@000F8@Otilde@000D5@otilde@000F5@Ouml@000D6@ouml@000F6@szlig@000DF@THORN@000DE@thorn@000FE@Uacute@000DA@uacute@000FA@Ucirc@000DB@ucirc@000FB@Ugrave@000D9@ugrave@000F9@Uuml@000DC@uuml@000FC@Yacute@000DD@yacute@000FD@yuml@000FF@Abreve@00102@abreve@00103@Amacr@00100@amacr@00101@Aogon@00104@aogon@00105@Cacute@00106@cacute@00107@Ccaron@0010C@ccaron@0010D@Ccirc@00108@ccirc@00109@Cdot@0010A@cdot@0010B@Dcaron@0010E@dcaron@0010F@Dstrok@00110@dstrok@00111@Ecaron@0011A@ecaron@0011B@Edot@00116@edot@00117@Emacr@00112@emacr@00113@ENG@0014A@eng@0014B@Eogon@00118@eogon@00119@gacute@001F5@Gbreve@0011E@gbreve@0011F@Gcedil@00122@Gcirc@0011C@gcirc@0011D@Gdot@00120@gdot@00121@Hcirc@00124@hcirc@00125@Hstrok@00126@hstrok@00127@Idot@00130@IJlig@00132@ijlig@00133@Imacr@0012A@imacr@0012B@inodot@00131@Iogon@0012E@iogon@0012F@Itilde@00128@itilde@00129@Jcirc@00134@jcirc@00135@Kcedil@00136@kcedil@00137@kgreen@00138@Lacute@00139@lacute@0013A@Lcaron@0013D@lcaron@0013E@Lcedil@0013B@lcedil@0013C@Lmidot@0013F@lmidot@00140@Lstrok@00141@lstrok@00142@Nacute@00143@nacute@00144@napos@00149@Ncaron@00147@ncaron@00148@Ncedil@00145@ncedil@00146@Odblac@00150@odblac@00151@OElig@00152@oelig@00153@Omacr@0014C@omacr@0014D@Racute@00154@racute@00155@Rcaron@00158@rcaron@00159@Rcedil@00156@rcedil@00157@Sacute@0015A@sacute@0015B@Scaron@00160@scaron@00161@Scedil@0015E@scedil@0015F@Scirc@0015C@scirc@0015D@Tcaron@00164@tcaron@00165@Tcedil@00162@tcedil@00163@Tstrok@00166@tstrok@00167@Ubreve@0016C@ubreve@0016D@Udblac@00170@udblac@00171@Umacr@0016A@umacr@0016B@Uogon@00172@uogon@00173@Uring@0016E@uring@0016F@Utilde@00168@utilde@00169@Wcirc@00174@wcirc@00175@Ycirc@00176@ycirc@00177@Yuml@00178@Zacute@00179@zacute@0017A@Zcaron@0017D@zcaron@0017E@Zdot@0017B@zdot@0017C@apos@00027@ast@0002A@brvbar@000A6@bsol@0005C@cent@000A2@colon@0003A@comma@0002C@commat@00040@copy@000A9@curren@000A4@darr@02193@deg@000B0@divide@000F7@dollar@00024@equals@0003D@excl@00021@frac12@000BD@frac14@000BC@frac18@0215B@frac34@000BE@frac38@0215C@frac58@0215D@frac78@0215E@gt@0003E@half@000BD@horbar@02015@hyphen@02010@iexcl@000A1@iquest@000BF@laquo@000AB@larr@02190@lcub@0007B@ldquo@0201C@lowbar@0005F@lpar@00028@lsqb@0005B@lsquo@02018@micro@000B5@middot@000B7@nbsp@000A0@not@000AC@num@00023@ohm@02126@ordf@000AA@ordm@000BA@para@000B6@percnt@00025@period@0002E@plus@0002B@plusmn@000B1@pound@000A3@quest@0003F@quot@00022@raquo@000BB@rarr@02192@rcub@0007D@rdquo@0201D@reg@000AE@rpar@00029@rsqb@0005D@rsquo@02019@sect@000A7@semi@0003B@shy@000AD@sol@0002F@sung@0266A@sup1@000B9@sup2@000B2@sup3@000B3@times@000D7@trade@02122@uarr@02191@verbar@0007C@yen@000A5@blank@02423@blk12@02592@blk14@02591@blk34@02593@block@02588@bull@02022@caret@02041@check@02713@cir@025CB@clubs@02663@copysr@02117@cross@02717@Dagger@02021@dagger@02020@dash@02010@diams@02666@dlcrop@0230D@drcrop@0230C@dtri@025BF@dtrif@025BE@emsp@02003@emsp13@02004@emsp14@02005@ensp@02002@female@02640@ffilig@0FB03@fflig@0FB00@ffllig@0FB04@filig@0FB01@flat@0266D@fllig@0FB02@frac13@02153@frac15@02155@frac16@02159@frac23@02154@frac25@02156@frac35@02157@frac45@02158@frac56@0215A@hairsp@0200A@hearts@02665@hellip@02026@hybull@02043@incare@02105@ldquor@0201E@lhblk@02584@loz@025CA@lozf@029EB@lsquor@0201A@ltri@025C3@ltrif@025C2@male@02642@malt@02720@marker@025AE@mdash@02014@mldr@02026@natur@0266E@ndash@02013@nldr@02025@numsp@02007@phone@0260E@puncsp@02008@rdquor@0201D@rect@025AD@rsquor@02019@rtri@025B9@rtrif@025B8@rx@0211E@sext@02736@sharp@0266F@spades@02660@squ@025A1@squf@025AA@star@02606@starf@02605@target@02316@telrec@02315@thinsp@02009@uhblk@02580@ulcrop@0230F@urcrop@0230E@utri@025B5@utrif@025B4@vellip@022EE@angzarr@0237C@cirmid@02AEF@cudarrl@02938@cudarrr@02935@cularr@021B6@cularrp@0293D@curarr@021B7@curarrm@0293C@Darr@021A1@dArr@021D3@ddarr@021CA@DDotrahd@02911@dfisht@0297F@dHar@02965@dharl@021C3@dharr@021C2@duarr@021F5@duhar@0296F@dzigrarr@027FF@erarr@02971@hArr@021D4@harr@02194@harrcir@02948@harrw@021AD@hoarr@021FF@imof@022B7@lAarr@021DA@Larr@0219E@larrbfs@0291F@larrfs@0291D@larrhk@021A9@larrlp@021AB@larrpl@02939@larrsim@02973@larrtl@021A2@lAtail@0291B@latail@02919@lBarr@0290E@lbarr@0290C@ldca@02936@ldrdhar@02967@ldrushar@0294B@ldsh@021B2@lfisht@0297C@lHar@02962@lhard@021BD@lharu@021BC@lharul@0296A@llarr@021C7@llhard@0296B@loarr@021FD@lrarr@021C6@lrhar@021CB@lrhard@0296D@lsh@021B0@lurdshar@0294A@luruhar@02966@Map@02905@map@021A6@midcir@02AF0@mumap@022B8@nearhk@02924@neArr@021D7@nearr@02197@nesear@02928@nhArr@021CE@nharr@021AE@nlArr@021CD@nlarr@0219A@nrArr@021CF@nrarr@0219B@nvHarr@02904@nvlArr@02902@nvrArr@02903@nwarhk@02923@nwArr@021D6@nwarr@02196@nwnear@02927@olarr@021BA@orarr@021BB@origof@022B6@rAarr@021DB@Rarr@021A0@rarrap@02975@rarrbfs@02920@rarrc@02933@rarrfs@0291E@rarrhk@021AA@rarrlp@021AC@rarrpl@02945@rarrsim@02974@Rarrtl@02916@rarrtl@021A3@rarrw@0219D@rAtail@0291C@ratail@0291A@RBarr@02910@rBarr@0290F@rbarr@0290D@rdca@02937@rdldhar@02969@rdsh@021B3@rfisht@0297D@rHar@02964@rhard@021C1@rharu@021C0@rharul@0296C@rlarr@021C4@rlhar@021CC@roarr@021FE@rrarr@021C9@rsh@021B1@ruluhar@02968@searhk@02925@seArr@021D8@searr@02198@seswar@02929@simrarr@02972@slarr@02190@srarr@02192@swarhk@02926@swArr@021D9@swarr@02199@swnwar@0292A@Uarr@0219F@uArr@021D1@Uarrocir@02949@udarr@021C5@udhar@0296E@ufisht@0297E@uHar@02963@uharl@021BF@uharr@021BE@uuarr@021C8@vArr@021D5@varr@02195@xhArr@027FA@xharr@027F7@xlArr@027F8@xlarr@027F5@xmap@027FC@xrArr@027F9@xrarr@027F6@zigrarr@021DD@ac@0223E@amalg@02A3F@barvee@022BD@Barwed@02306@barwed@02305@bsolb@029C5@Cap@022D2@capand@02A44@capbrcup@02A49@capcap@02A4B@capcup@02A47@capdot@02A40@ccaps@02A4D@ccups@02A4C@ccupssm@02A50@coprod@02210@Cup@022D3@cupbrcap@02A48@cupcap@02A46@cupcup@02A4A@cupdot@0228D@cupor@02A45@cuvee@022CE@cuwed@022CF@Dagger@02021@dagger@02020@diam@022C4@divonx@022C7@eplus@02A71@hercon@022B9@intcal@022BA@iprod@02A3C@loplus@02A2D@lotimes@02A34@lthree@022CB@ltimes@022C9@midast@0002A@minusb@0229F@minusd@02238@minusdu@02A2A@ncap@02A43@ncup@02A42@oast@0229B@ocir@0229A@odash@0229D@odiv@02A38@odot@02299@odsold@029BC@ofcir@029BF@ogt@029C1@ohbar@029B5@olcir@029BE@olt@029C0@omid@029B6@ominus@02296@opar@029B7@operp@029B9@oplus@02295@osol@02298@Otimes@02A37@otimes@02297@otimesas@02A36@ovbar@0233D@plusacir@02A23@plusb@0229E@pluscir@02A22@plusdo@02214@plusdu@02A25@pluse@02A72@plussim@02A26@plustwo@02A27@prod@0220F@race@029DA@roplus@02A2E@rotimes@02A35@rthree@022CC@rtimes@022CA@sdot@022C5@sdotb@022A1@setmn@02216@simplus@02A24@smashp@02A33@solb@029C4@sqcap@02293@sqcup@02294@ssetmn@02216@sstarf@022C6@subdot@02ABD@sum@02211@supdot@02ABE@timesb@022A0@timesbar@02A31@timesd@02A30@tridot@025EC@triminus@02A3A@triplus@02A39@trisb@029CD@tritime@02A3B@uplus@0228E@veebar@022BB@wedbar@02A5F@wreath@02240@xcap@022C2@xcirc@025EF@xcup@022C3@xdtri@025BD@xodot@02A00@xoplus@02A01@xotime@02A02@xsqcup@02A06@xuplus@02A04@xutri@025B3@xvee@022C1@xwedge@022C0@dlcorn@0231E@drcorn@0231F@gtlPar@02995@langd@02991@lbrke@0298B@lbrksld@0298F@lbrkslu@0298D@lceil@02308@lfloor@0230A@lmoust@023B0@lparlt@02993@ltrPar@02996@rangd@02992@rbrke@0298C@rbrksld@0298E@rbrkslu@02990@rceil@02309@rfloor@0230B@rmoust@023B1@rpargt@02994@ulcorn@0231C@urcorn@0231D@gnap@02A8A@gnE@02269@gne@02A88@gnsim@022E7@lnap@02A89@lnE@02268@lne@02A87@lnsim@022E6@nap@02249@ncong@02247@nequiv@02262@nge@02271@ngsim@02275@ngt@0226F@nle@02270@nlsim@02274@nlt@0226E@nltri@022EA@nltrie@022EC@nmid@02224@npar@02226@npr@02280@nprcue@022E0@nrtri@022EB@nrtrie@022ED@nsc@02281@nsccue@022E1@nsim@02241@nsime@02244@nsmid@02224@nspar@02226@nsqsube@022E2@nsqsupe@022E3@nsub@02284@nsube@02288@nsup@02285@nsupe@02289@ntgl@02279@ntlg@02278@nVDash@022AF@nVdash@022AE@nvDash@022AD@nvdash@022AC@parsim@02AF3@prnap@02AB9@prnE@02AB5@prnsim@022E8@rnmid@02AEE@scnap@02ABA@scnE@02AB6@scnsim@022E9@simne@02246@solbar@0233F@subnE@02ACB@subne@0228A@supnE@02ACC@supne@0228B@ang@02220@ange@029A4@angmsd@02221@angmsdaa@029A8@angmsdab@029A9@angmsdac@029AA@angmsdad@029AB@angmsdae@029AC@angmsdaf@029AD@angmsdag@029AE@angmsdah@029AF@angrtvb@022BE@angrtvbd@0299D@bbrk@023B5@bbrktbrk@023B6@bemptyv@029B0@beth@02136@boxbox@029C9@";
com.wiris.util.xml.WEntities.s2 = "bprime@02035@bsemi@0204F@cemptyv@029B2@cirE@029C3@cirscir@029C2@comp@02201@daleth@02138@demptyv@029B1@ell@02113@empty@02205@emptyv@02205@gimel@02137@iiota@02129@image@02111@imath@00131@jmath@0006A@laemptyv@029B4@lltri@025FA@lrtri@022BF@mho@02127@nexist@02204@oS@024C8@planck@0210F@plankv@0210F@raemptyv@029B3@range@029A5@real@0211C@tbrk@023B4@trpezium@0FFFD@ultri@025F8@urtri@025F9@vzigzag@0299A@weierp@02118@apE@02A70@ape@0224A@apid@0224B@asymp@02248@Barv@02AE7@bcong@0224C@bepsi@003F6@bowtie@022C8@bsim@0223D@bsime@022CD@bump@0224E@bumpE@02AAE@bumpe@0224F@cire@02257@Colon@02237@Colone@02A74@colone@02254@congdot@02A6D@csub@02ACF@csube@02AD1@csup@02AD0@csupe@02AD2@cuepr@022DE@cuesc@022DF@Dashv@02AE4@dashv@022A3@easter@02A6E@ecir@02256@ecolon@02255@eDDot@02A77@eDot@02251@efDot@02252@eg@02A9A@egs@02A96@egsdot@02A98@el@02A99@els@02A95@elsdot@02A97@equest@0225F@equivDD@02A78@erDot@02253@esdot@02250@Esim@02A73@esim@02242@fork@022D4@forkv@02AD9@frown@02322@gap@02A86@gE@02267@gEl@02A8C@gel@022DB@ges@02A7E@gescc@02AA9@gesdot@02A80@gesdoto@02A82@gesdotol@02A84@gesles@02A94@Gg@022D9@gl@02277@gla@02AA5@glE@02A92@glj@02AA4@gsim@02273@gsime@02A8E@gsiml@02A90@Gt@0226B@gtcc@02AA7@gtcir@02A7A@gtdot@022D7@gtquest@02A7C@gtrarr@02978@homtht@0223B@lap@02A85@lat@02AAB@late@02AAD@lE@02266@lEg@02A8B@leg@022DA@les@02A7D@lescc@02AA8@lesdot@02A7F@lesdoto@02A81@lesdotor@02A83@lesges@02A93@lg@02276@lgE@02A91@Ll@022D8@lsim@02272@lsime@02A8D@lsimg@02A8F@Lt@0226A@ltcc@02AA6@ltcir@02A79@ltdot@022D6@ltlarr@02976@ltquest@02A7B@ltrie@022B4@mcomma@02A29@mDDot@0223A@mid@02223@mlcp@02ADB@models@022A7@mstpos@0223E@Pr@02ABB@pr@0227A@prap@02AB7@prcue@0227C@prE@02AB3@pre@02AAF@prsim@0227E@prurel@022B0@ratio@02236@rtrie@022B5@rtriltri@029CE@Sc@02ABC@sc@0227B@scap@02AB8@sccue@0227D@scE@02AB4@sce@02AB0@scsim@0227F@sdote@02A66@sfrown@02322@simg@02A9E@simgE@02AA0@siml@02A9D@simlE@02A9F@smid@02223@smile@02323@smt@02AAA@smte@02AAC@spar@02225@sqsub@0228F@sqsube@02291@sqsup@02290@sqsupe@02292@ssmile@02323@Sub@022D0@subE@02AC5@subedot@02AC3@submult@02AC1@subplus@02ABF@subrarr@02979@subsim@02AC7@subsub@02AD5@subsup@02AD3@Sup@022D1@supdsub@02AD8@supE@02AC6@supedot@02AC4@suphsub@02AD7@suplarr@0297B@supmult@02AC2@supplus@02AC0@supsim@02AC8@supsub@02AD4@supsup@02AD6@thkap@02248@thksim@0223C@topfork@02ADA@trie@0225C@twixt@0226C@Vbar@02AEB@vBar@02AE8@vBarv@02AE9@VDash@022AB@Vdash@022A9@vDash@022A8@vdash@022A2@Vdashl@02AE6@vltri@022B2@vprop@0221D@vrtri@022B3@Vvdash@022AA@alpha@003B1@beta@003B2@chi@003C7@Delta@00394@delta@003B4@epsi@003F5@epsiv@003B5@eta@003B7@Gamma@00393@gamma@003B3@Gammad@003DC@gammad@003DD@iota@003B9@kappa@003BA@kappav@003F0@Lambda@0039B@lambda@003BB@mu@003BC@nu@003BD@Omega@003A9@omega@003C9@Phi@003A6@phi@003C6@phiv@003D5@Pi@003A0@pi@003C0@piv@003D6@Psi@003A8@psi@003C8@rho@003C1@rhov@003F1@Sigma@003A3@sigma@003C3@sigmav@003C2@tau@003C4@Theta@00398@theta@003B8@thetav@003D1@Upsi@003D2@upsi@003C5@Xi@0039E@xi@003BE@zeta@003B6@Cfr@0212D@Hfr@0210C@Ifr@02111@Rfr@0211C@Zfr@02128@Copf@02102@Hopf@0210D@Nopf@02115@Popf@02119@Qopf@0211A@Ropf@0211D@Zopf@02124@acd@0223F@aleph@02135@And@02A53@and@02227@andand@02A55@andd@02A5C@andslope@02A58@andv@02A5A@angrt@0221F@angsph@02222@angst@0212B@ap@02248@apacir@02A6F@awconint@02233@awint@02A11@becaus@02235@bernou@0212C@bNot@02AED@bnot@02310@bottom@022A5@cap@02229@Cconint@02230@cirfnint@02A10@compfn@02218@cong@02245@Conint@0222F@conint@0222E@ctdot@022EF@cup@0222A@cwconint@02232@cwint@02231@cylcty@0232D@disin@022F2@Dot@000A8@DotDot@020DC@dsol@029F6@dtdot@022F1@dwangle@029A6@elinters@0FFFD@epar@022D5@eparsl@029E3@equiv@02261@eqvparsl@029E5@exist@02203@fltns@025B1@fnof@00192@forall@02200@fpartint@02A0D@ge@02265@hamilt@0210B@iff@021D4@iinfin@029DC@imped@001B5@infin@0221E@infintie@029DD@Int@0222C@int@0222B@intlarhk@02A17@isin@02208@isindot@022F5@isinE@022F9@isins@022F4@isinsv@022F3@isinv@02208@lagran@02112@Lang@0300A@lang@02329@lArr@021D0@lbbrk@03014@le@02264@loang@03018@lobrk@0301A@lopar@02985@lowast@02217@minus@02212@mnplus@02213@nabla@02207@ne@02260@nhpar@02AF2@ni@0220B@nis@022FC@nisd@022FA@niv@0220B@Not@02AEC@notin@02209@notinva@02209@notinvb@022F7@notinvc@022F6@notni@0220C@notniva@0220C@notnivb@022FE@notnivc@022FD@npolint@02A14@nvinfin@029DE@olcross@029BB@Or@02A54@or@02228@ord@02A5D@order@02134@oror@02A56@orslope@02A57@orv@02A5B@par@02225@parsl@02AFD@part@02202@permil@02030@perp@022A5@pertenk@02031@phmmat@02133@pointint@02A15@Prime@02033@prime@02032@profalar@0232E@profline@02312@profsurf@02313@prop@0221D@qint@02A0C@qprime@02057@quatint@02A16@radic@0221A@Rang@0300B@rang@0232A@rArr@021D2@rbbrk@03015@roang@03019@robrk@0301B@ropar@02986@rppolint@02A12@scpolint@02A13@sim@0223C@simdot@02A6A@sime@02243@smeparsl@029E4@square@025A1@squarf@025AA@strns@000AF@sub@02282@sube@02286@sup@02283@supe@02287@tdot@020DB@there4@02234@tint@0222D@top@022A4@topbot@02336@topcir@02AF1@tprime@02034@utdot@022F0@uwangle@029A7@vangrt@0299C@veeeq@0225A@Verbar@02016@wedgeq@02259@xnis@022FB@angle@02220@ApplyFunction@02061@approx@02248@approxeq@0224A@Assign@02254@backcong@0224C@backepsilon@003F6@backprime@02035@backsim@0223D@backsimeq@022CD@Backslash@02216@barwedge@02305@Because@02235@because@02235@Bernoullis@0212C@between@0226C@bigcap@022C2@bigcirc@025EF@bigcup@022C3@bigodot@02A00@bigoplus@02A01@bigotimes@02A02@bigsqcup@02A06@bigstar@02605@bigtriangledown@025BD@bigtriangleup@025B3@biguplus@02A04@bigvee@022C1@bigwedge@022C0@bkarow@0290D@blacklozenge@029EB@blacksquare@025AA@blacktriangle@025B4@blacktriangledown@025BE@blacktriangleleft@025C2@blacktriangleright@025B8@bot@022A5@boxminus@0229F@boxplus@0229E@boxtimes@022A0@Breve@002D8@bullet@02022@Bumpeq@0224E@bumpeq@0224F@CapitalDifferentialD@02145@Cayleys@0212D@Cedilla@000B8@CenterDot@000B7@centerdot@000B7@checkmark@02713@circeq@02257@circlearrowleft@021BA@circlearrowright@021BB@circledast@0229B@circledcirc@0229A@circleddash@0229D@CircleDot@02299@circledR@000AE@circledS@024C8@CircleMinus@02296@CirclePlus@02295@CircleTimes@02297@ClockwiseContourIntegral@02232@CloseCurlyDoubleQuote@0201D@CloseCurlyQuote@02019@clubsuit@02663@coloneq@02254@complement@02201@complexes@02102@Congruent@02261@ContourIntegral@0222E@Coproduct@02210@CounterClockwiseContourIntegral@02233@CupCap@0224D@curlyeqprec@022DE@curlyeqsucc@022DF@curlyvee@022CE@curlywedge@022CF@curvearrowleft@021B6@curvearrowright@021B7@dbkarow@0290F@ddagger@02021@ddotseq@02A77@Del@02207@DiacriticalAcute@000B4@DiacriticalDot@002D9@DiacriticalDoubleAcute@002DD@DiacriticalGrave@00060@DiacriticalTilde@002DC@Diamond@022C4@diamond@022C4@diamondsuit@02666@DifferentialD@02146@digamma@003DD@div@000F7@divideontimes@022C7@doteq@02250@doteqdot@02251@DotEqual@02250@dotminus@02238@dotplus@02214@dotsquare@022A1@doublebarwedge@02306@DoubleContourIntegral@0222F@DoubleDot@000A8@DoubleDownArrow@021D3@DoubleLeftArrow@021D0@DoubleLeftRightArrow@021D4@DoubleLeftTee@02AE4@DoubleLongLeftArrow@027F8@DoubleLongLeftRightArrow@027FA@DoubleLongRightArrow@027F9@DoubleRightArrow@021D2@DoubleRightTee@022A8@DoubleUpArrow@021D1@DoubleUpDownArrow@021D5@DoubleVerticalBar@02225@DownArrow@02193@Downarrow@021D3@downarrow@02193@DownArrowUpArrow@021F5@downdownarrows@021CA@downharpoonleft@021C3@downharpoonright@021C2@DownLeftVector@021BD@DownRightVector@021C1@DownTee@022A4@DownTeeArrow@021A7@drbkarow@02910@Element@02208@emptyset@02205@eqcirc@02256@eqcolon@02255@eqsim@02242@eqslantgtr@02A96@eqslantless@02A95@EqualTilde@02242@Equilibrium@021CC@Exists@02203@expectation@02130@ExponentialE@02147@exponentiale@02147@fallingdotseq@02252@ForAll@02200@Fouriertrf@02131@geq@02265@geqq@02267@geqslant@02A7E@gg@0226B@ggg@022D9@gnapprox@02A8A@gneq@02A88@gneqq@02269@GreaterEqual@02265@GreaterEqualLess@022DB@GreaterFullEqual@02267@GreaterLess@02277@GreaterSlantEqual@02A7E@GreaterTilde@02273@gtrapprox@02A86@gtrdot@022D7@gtreqless@022DB@gtreqqless@02A8C@gtrless@02277@gtrsim@02273@Hacek@002C7@hbar@0210F@heartsuit@02665@HilbertSpace@0210B@hksearow@02925@hkswarow@02926@hookleftarrow@021A9@hookrightarrow@021AA@hslash@0210F@HumpDownHump@0224E@HumpEqual@0224F@iiiint@02A0C@iiint@0222D@Im@02111@ImaginaryI@02148@imagline@02110@imagpart@02111@Implies@021D2@in@02208@integers@02124@Integral@0222B@intercal@022BA@Intersection@022C2@intprod@02A3C@InvisibleComma@02063@InvisibleTimes@02062@langle@02329@Laplacetrf@02112@lbrace@0007B@lbrack@0005B@LeftAngleBracket@02329@LeftArrow@02190@Leftarrow@021D0@leftarrow@02190@LeftArrowBar@021E4@LeftArrowRightArrow@021C6@leftarrowtail@021A2@LeftCeiling@02308@LeftDoubleBracket@0301A@LeftDownVector@021C3@LeftFloor@0230A@leftharpoondown@021BD@leftharpoonup@021BC@leftleftarrows@021C7@LeftRightArrow@02194@Leftrightarrow@021D4@leftrightarrow@02194@leftrightarrows@021C6@leftrightharpoons@021CB@leftrightsquigarrow@021AD@LeftTee@022A3@LeftTeeArrow@021A4@leftthreetimes@022CB@LeftTriangle@022B2@LeftTriangleEqual@022B4@LeftUpVector@021BF@LeftVector@021BC@leq@02264@leqq@02266@leqslant@02A7D@lessapprox@02A85@lessdot@022D6@lesseqgtr@022DA@lesseqqgtr@02A8B@LessEqualGreater@022DA@LessFullEqual@02266@LessGreater@02276@lessgtr@02276@lesssim@02272@LessSlantEqual@02A7D@LessTilde@02272@ll@0226A@llcorner@0231E@Lleftarrow@021DA@lmoustache@023B0@lnapprox@02A89@lneq@02A87@lneqq@02268@LongLeftArrow@027F5@Longleftarrow@027F8@longleftarrow@027F5@LongLeftRightArrow@027F7@Longleftrightarrow@027FA@longleftrightarrow@027F7@longmapsto@027FC@LongRightArrow@027F6@Longrightarrow@027F9@longrightarrow@027F6@looparrowleft@021AB@looparrowright@021AC@LowerLeftArrow@02199@LowerRightArrow@02198@lozenge@025CA@lrcorner@0231F@Lsh@021B0@maltese@02720@mapsto@021A6@measuredangle@02221@Mellintrf@02133@MinusPlus@02213@mp@02213@multimap@022B8@napprox@02249@natural@0266E@naturals@02115@nearrow@02197@NegativeMediumSpace@0200B@NegativeThickSpace@0200B@NegativeThinSpace@0200B@NegativeVeryThinSpace@0200B@NestedGreaterGreater@0226B@NestedLessLess@0226A@nexists@02204@ngeq@02271@ngtr@0226F@nLeftarrow@021CD@nleftarrow@0219A@nLeftrightarrow@021CE@nleftrightarrow@021AE@nleq@02270@nless@0226E@NonBreakingSpace@000A0@NotCongruent@02262@NotDoubleVerticalBar@02226@NotElement@02209@NotEqual@02260@NotExists@02204@NotGreater@0226F@NotGreaterEqual@02271@NotGreaterLess@02279@NotGreaterTilde@02275@NotLeftTriangle@022EA@NotLeftTriangleEqual@022EC@NotLess@0226E@NotLessEqual@02270@NotLessGreater@02278@NotLessTilde@02274@NotPrecedes@02280@NotPrecedesSlantEqual@022E0@NotReverseElement@0220C@NotRightTriangle@022EB@NotRightTriangleEqual@022ED@NotSquareSubsetEqual@022E2@NotSquareSupersetEqual@022E3@NotSubsetEqual@02288@NotSucceeds@02281@NotSucceedsSlantEqual@022E1@NotSupersetEqual@02289@NotTilde@02241@NotTildeEqual@02244@NotTildeFullEqual@02247@NotTildeTilde@02249@NotVerticalBar@02224@nparallel@02226@nprec@02280@nRightarrow@021CF@nrightarrow@0219B@nshortmid@02224@nshortparallel@02226@nsimeq@02244@nsubseteq@02288@nsucc@02281@nsupseteq@02289@ntriangleleft@022EA@ntrianglelefteq@022EC@ntriangleright@022EB@ntrianglerighteq@022ED@nwarrow@02196@oint@0222E@OpenCurlyDoubleQuote@0201C@OpenCurlyQuote@02018@orderof@02134@parallel@02225@PartialD@02202@pitchfork@022D4@PlusMinus@000B1@pm@000B1@Poincareplane@0210C@prec@0227A@precapprox@02AB7@preccurlyeq@0227C@Precedes@0227A@PrecedesEqual@02AAF@PrecedesSlantEqual@0227C@PrecedesTilde@0227E@preceq@02AAF@precnapprox@02AB9@precneqq@02AB5@precnsim@022E8@precsim@0227E@primes@02119@Proportion@02237@Proportional@0221D@propto@0221D@quaternions@0210D@questeq@0225F@rangle@0232A@rationals@0211A@rbrace@0007D@rbrack@0005D@Re@0211C@realine@0211B@realpart@0211C@reals@0211D@ReverseElement@0220B@ReverseEquilibrium@021CB@ReverseUpEquilibrium@0296F@RightAngleBracket@0232A@RightArrow@02192@Rightarrow@021D2@rightarrow@02192@RightArrowBar@021E5@RightArrowLeftArrow@021C4@rightarrowtail@021A3@RightCeiling@02309@RightDoubleBracket@0301B@RightDownVector@021C2@RightFloor@0230B@rightharpoondown@021C1@rightharpoonup@021C0@rightleftarrows@021C4@rightleftharpoons@021CC@rightrightarrows@021C9@rightsquigarrow@0219D@RightTee@022A2@RightTeeArrow@021A6@rightthreetimes@022CC@RightTriangle@022B3@RightTriangleEqual@022B5@RightUpVector@021BE@RightVector@021C0@risingdotseq@02253@rmoustache@023B1@Rrightarrow@021DB@Rsh@021B1@searrow@02198@setminus@02216@ShortDownArrow@02193@ShortLeftArrow@02190@shortmid@02223@shortparallel@02225@ShortRightArrow@02192@ShortUpArrow@02191@simeq@02243@SmallCircle@02218@smallsetminus@02216@spadesuit@02660@Sqrt@0221A@sqsubset@0228F@sqsubseteq@02291@sqsupset@02290@sqsupseteq@02292@Square@025A1@SquareIntersection@02293@SquareSubset@0228F@SquareSubsetEqual@02291@SquareSuperset@02290@SquareSupersetEqual@02292@SquareUnion@02294@Star@022C6@straightepsilon@003F5@straightphi@003D5@Subset@022D0@subset@02282@subseteq@02286@subseteqq@02AC5@SubsetEqual@02286@subsetneq@0228A@subsetneqq@02ACB@succ@0227B@succapprox@02AB8@succcurlyeq@0227D@Succeeds@0227B@SucceedsEqual@02AB0@SucceedsSlantEqual@0227D@SucceedsTilde@0227F@succeq@02AB0@succnapprox@02ABA@succneqq@02AB6@succnsim@022E9@succsim@0227F@SuchThat@0220B@Sum@02211@Superset@02283@SupersetEqual@02287@Supset@022D1@supset@02283@supseteq@02287@supseteqq@02AC6@supsetneq@0228B@supsetneqq@02ACC@swarrow@02199@Therefore@02234@therefore@02234@thickapprox@02248@thicksim@0223C@ThinSpace@02009@Tilde@0223C@TildeEqual@02243@TildeFullEqual@02245@TildeTilde@02248@toea@02928@tosa@02929@triangle@025B5@triangledown@025BF@triangleleft@025C3@trianglelefteq@022B4@triangleq@0225C@triangleright@025B9@trianglerighteq@022B5@TripleDot@020DB@twoheadleftarrow@0219E@twoheadrightarrow@021A0@ulcorner@0231C@Union@022C3@UnionPlus@0228E@UpArrow@02191@Uparrow@021D1@uparrow@02191@UpArrowDownArrow@021C5@UpDownArrow@02195@Updownarrow@021D5@updownarrow@02195@UpEquilibrium@0296E@upharpoonleft@021BF@upharpoonright@021BE@UpperLeftArrow@02196@UpperRightArrow@02197@upsilon@003C5@UpTee@022A5@UpTeeArrow@021A5@upuparrows@021C8@urcorner@0231D@varepsilon@003B5@varkappa@003F0@varnothing@02205@varphi@003C6@varpi@003D6@varpropto@0221D@varrho@003F1@varsigma@003C2@vartheta@003D1@vartriangleleft@022B2@vartriangleright@022B3@Vee@022C1@vee@02228@Vert@02016@vert@0007C@VerticalBar@02223@VerticalTilde@02240@VeryThinSpace@0200A@Wedge@022C0@wedge@02227@wp@02118@wr@02240@zeetrf@02128@af@02061@asympeq@0224D@Cross@02A2F@DD@02145@dd@02146@DownArrowBar@02913@DownBreve@00311@DownLeftRightVector@02950@DownLeftTeeVector@0295E@DownLeftVectorBar@02956@DownRightTeeVector@0295F@DownRightVectorBar@02957@ee@02147@EmptySmallSquare@025FB@EmptyVerySmallSquare@025AB@Equal@02A75@FilledSmallSquare@025FC@FilledVerySmallSquare@025AA@GreaterGreater@02AA2@Hat@0005E@HorizontalLine@02500@ic@02063@ii@02148@it@02062@larrb@021E4@LeftDownTeeVector@02961@LeftDownVectorBar@02959@LeftRightVector@0294E@LeftTeeVector@0295A@LeftTriangleBar@029CF@LeftUpDownVector@02951@LeftUpTeeVector@02960@LeftUpVectorBar@02958@LeftVectorBar@02952@LessLess@02AA1@mapstodown@021A7@mapstoleft@021A4@mapstoup@021A5@MediumSpace@0205F@NewLine@0000A@NoBreak@02060@NotCupCap@0226D@OverBar@000AF@OverBrace@0FE37@OverBracket@023B4@OverParenthesis@0FE35@planckh@0210E@Product@0220F@rarrb@021E5@RightDownTeeVector@0295D@RightDownVectorBar@02955@RightTeeVector@0295B@RightTriangleBar@029D0@RightUpDownVector@0294F@RightUpTeeVector@0295C@RightUpVectorBar@02954@RightVectorBar@02953@RoundImplies@02970@RuleDelayed@029F4@Tab@00009@UnderBar@00332@UnderBrace@0FE38@UnderBracket@023B5@UnderParenthesis@0FE36@UpArrowBar@02912@Upsilon@003A5@VerticalLine@0007C@VerticalSeparator@02758@ZeroWidthSpace@0200B@omicron@003BF@amalg@02210@NegativeThinSpace@0E000@";
com.wiris.util.xml.WEntities.MATHML_ENTITIES = com.wiris.util.xml.WEntities.s1 + com.wiris.util.xml.WEntities.s2;
com.wiris.quizzes.Answer.tagName = "answer";
com.wiris.quizzes.MultipleQuestionRequest.tagName = "processQuestions";
com.wiris.quizzes.ResultGetCheckAssertions.tagName = "getCheckAssertionsResult";
com.wiris.quizzes.AssertionCheck.tagName = "check";
com.wiris.quizzes.ResultGetVariables.tagName = "getVariablesResult";
com.wiris.quizzes.QuizzesConfig.WIRIS_SERVICE_URL = "http://www.wiris.net/demo/wiris";
com.wiris.quizzes.QuizzesConfig.EDITOR_SERVICE_URL = "http://www.wiris.net/demo/editor";
com.wiris.quizzes.QuizzesConfig.QUIZZES_SERVICE_URL = "http://www.wiris.net/demo/quizzes";
com.wiris.quizzes.QuizzesConfig.QUIZZES_PROXY_URL = "/quizzesproxy/service";
com.wiris.quizzes.QuizzesConfig.QUIZZES_RESOURCES_URL = "/quizzesproxy";
com.wiris.quizzes.QuizzesConfig.QUIZZES_SERVICE_ROUTER_LOCATION = "router.xml";
com.wiris.quizzes.QuizzesConfig.QUIZZES_CACHE_PATH = "E:\\tmp\\image-cache";
com.wiris.quizzes.Variable.tagName = "variable";
com.wiris.quizzes.ResultError.tagName = "error";
com.wiris.quizzes.ResultError.TYPE_MATHSYNTAX = "mathSyntax";
com.wiris.quizzes.ResultError.TYPE_PARAMVALUE = "paramValue";
com.wiris.quizzes.JsQuizzesFilter.DEBUG = true;
com.wiris.quizzes.JsQuizzesFilter.CLASS_QUESTION = "wirisquestion";
com.wiris.quizzes.JsQuizzesFilter.CLASS_QUESTION_INSTANCE = "wirisquestioninstance";
com.wiris.quizzes.JsQuizzesFilter.CLASS_AUTHOR_FIELD = "wirisauthoringfield";
com.wiris.quizzes.JsQuizzesFilter.CLASS_OPENANSWER = "wirisopenanswer";
com.wiris.quizzes.JsQuizzesFilter.CLASS_MULTICHOICE = "wirismultichoice";
com.wiris.quizzes.JsQuizzesFilter.CLASS_MULTICHOICE_GRADE = "wirismultichoicegrade";
com.wiris.quizzes.JsQuizzesFilter.CLASS_ANSWER_FIELD = "wirisanswerfield";
com.wiris.quizzes.JsQuizzesFilter.CLASS_EDITOR = "wiriseditor";
com.wiris.quizzes.JsQuizzesFilter.CLASS_MATHINPUT = "wirismathinput";
js.Lib.onerror = null;
com.wiris.settings.PlatformSettings.PARSE_XML_ENTITIES = true;
com.wiris.settings.PlatformSettings.UTF8_CONVERSION = false;
com.wiris.settings.PlatformSettings.IS_JAVASCRIPT = true;
