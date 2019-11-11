export function gePositionStickySupport() {
  let el = document.createElement('a'), mStyle = el.style
  mStyle.cssText = "position:sticky;position:-webkit-sticky;position:-ms-sticky;"
  return mStyle.position.indexOf('sticky')!==-1
}

export function next(el) {
  do {
		el = el.nextSibling;
  } while (el && el.nodeType !== 1);
  return el;        
}

export function $(selector, context = document) {
	let el = (typeof selector === 'string')?context.querySelector(selector):selector
	if (el) {
		el.css = function(newCSS){
			if (typeof newCSS === 'string') {
				let v = window.getComputedStyle(el, null).getPropertyValue(newCSS)
				return isNaN(parseFloat(v))?v:(parseFloat(v))
			} else {
				Object.assign(ln.style, newCSS)
				return el		
			}
		}
		el.setAttributes = (attrs)=>{
			Object.keys(attrs).forEach(key => (attrs[key])?el.setAttribute(key, attrs[key]):el.removeAttribute(key))
		}
		el.on = function(events, handler, options = false){
			events.split(' ').forEach(e=>el.addEventListener(e, handler, options));
			return el		
		}
		el.off = function(events, handler){
			events.split(' ').forEach(e=>el.removeEventListener(e, handler));
			return el		
		}
	}
	return el
}

export function $$(selector, context = document) {
	let els = Array.from(context.querySelectorAll(selector))
	els.css = function(newCSS){
		if (typeof newCSS === 'string') {
			let v = window.getComputedStyle(els[0], null).getPropertyValue(newCSS)
			return isNaN(parseFloat(v))?v:(parseFloat(v))
		} else {
			els.forEach(el => {
				Object.assign(el.style, newCSS)
			})
			return els		
		}
	}
	els.on = function(events, handler, options = false){
		els.forEach(el=>{
			events.split(' ').forEach(e=>el.addEventListener(e, handler, options));
		})
		return els		
	}
	els.off = function(events, handler){
		els.forEach(el=>{
			events.split(' ').forEach(e=>el.removeEventListener(e, handler));
		})
		return els
	}
	let r = (els.length)?els:null
	return r
}