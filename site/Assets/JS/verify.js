class Standard {
    constructor(attr, options={}) {
        this.customAttr = attr;
        this.options = options;
        this.approvedAttrs = {
            "input": true,
            "input-label": true,
            "input-required": true,
            "input-required-label": true,
            "input-error": true,
            "input-error-label": true,
            "input-list": true,
            "input-list-circle": true,
            "select": true,
            "link": true,
            "btn": true,
            "btn-2ry": true,
            "btn-style1-p1": true,
            "btn-style1-p1-2ry": true,
            "btn-style2-p2": true,
            "btn-style2-p2-2ry": true,
            "flat-btn": true,
            "flat-btn-2ry": true,
            "toggle": true,
            "toggle-active": true,
            "acr": true,
            "indeterminate-progress": true,
            "indeterminate-loader": true,
            "tabs": true,
            "toasts": true,
            "toasts-success": true,
            "toasts-warning": true,
            "toasts-error": true,
            "toasts-outline": true,
            "toasts-outline-success": true,
            "toasts-outline-warning": true,
            "toasts-outline-error": true,
            "alerts": true,
            "alerts-warning": true,
            "alerts-error": true,
            "status-info": true,
            "status-success": true,
            "status-warning": true,
            "status-error": true,
            "tooltip-right": true,
            "tooltip-left": true,
            "tooltip-bottom": true,
            "tooltip-top": true,
            "table": true,
            "table-action": true,
            "table-filter": true,
            "table-action-filter": true,
            "layout-hmf": true,
            "layout-hm": true,
            "layout-am": true,
            "layout-ams": true,
            "layout-asm": true,
            "layout-ham": true,
            "layout-aham": true,
            "layout-ahams": true,
            "layout-hamsf": true,
            "list": true,
            "list-column": true,
            "list-column-alt": true,
            "list-column-switch": true,
            "list-column-fill": true,
            "list-column-between": true,
            "list-column-stretch": true,
            "header": true,
            "nav": true,
            "aside": true,
            "section": true,
            "main": true,
            "footer": true,
            // Manually added -------------
            "showTooltip":true,
            "sm-txt":true,
            "bold": true,
            "underline": true,
            "italic": true,
        };
        this.elements = null;
        this.elementsCount = 0;
        this.elList = {};
        this.stats = {
            'components':{
                total:0,
                valid:0,
                invalid:0
            }
        };
        console.log("%cACR Standard Verification","color: #fff; font-family:sans-serif; font-size: 12px;background-color:#3c8bfd;padding:5px 10px;border-radius:3px;");
    }
    init(){
        this.getElements();
        this.checkForAttrErrors();
    }
    getElements() {
        // Get all DOM standard elements
        this.elements = document.querySelectorAll('[' + this.customAttr + ']');
        this.elementsCount = this.elements.length;
    }
    checkForAttrErrors(){
        // Check for syntax errors 
        this.elList = {};
        for(let i=0; i<this.elementsCount;i++){
            let el = this.elements[i],
                attrText = el.getAttribute(this.customAttr),
                attr = el.getAttribute(this.customAttr).split(/ (.+)/), // Split on first occurance of a space
                elState = attr[0],
                elMod = attr[1];
            // If attribute empty, then set to acr
            if(elState == ''){
                elState = 'acr';
            }
            // Log all invalid attribute values
            console.assert(this.approvedAttrs[elState], 'Invalid '+this.customAttr+' standard attribute value "'+attrText+'".');

            if(!this.elList[elState]){
                this.elList[elState] = {
                    valid: this.approvedAttrs[elState]? true : false,
                    count:1
                };
                if(this.elList[elState].valid){
                    this.stats.components.valid++;
                }else{
                    this.stats.components.invalid++;
                }
                
            }else{
                this.elList[elState].count++;
                if(this.elList[elState].valid){
                    this.stats.components.valid++;
                }else{
                    this.stats.components.invalid++;
                }
            }
            // Check if valid attributes are used on supported tags
        }
        this.stats.components.total = this.elementsCount;
        console.table(this.stats);
        console.table(this.elList);
    }

}

// var acr = new Standard('acr');
// acr.init();