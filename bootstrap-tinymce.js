angular.module("schemaForm").run(["$templateCache", function($templateCache) {$templateCache.put("directives/decorators/bootstrap/tinymce/tinymce.html","<div class=\"form-group\" ng-class=\"{\'has-error\': hasError()}\">\r\n    <label class=\"control-label\" ng-show=\"showTitle()\">{{form.title}}</label>\r\n    <textarea ui-tinymce=\"form.tinymceOptions\" ng-model=\"$$value$$\" schema-validate=\"form\"></textarea>\r\n    <span class=\"help-block\">{{ (hasError() && errorMessage(schemaError())) || form.description}}</span>\r\n</div>");}]);
angular.module('schemaForm-tinymce', ['schemaForm', 'ui.tinymce']).config([
    'schemaFormProvider',
    'schemaFormDecoratorsProvider',
    'sfPathProvider',
    function (schemaFormProvider, schemaFormDecoratorsProvider, sfPathProvider) {

        var wysiwyg = function (name, schema, options) {
            if (schema.type == 'string' && schema.format == 'html') {
                var f = schemaFormProvider.stdFormObj(name, schema, options);
                f.key = options.path;
                f.type = 'wysiwyg';
                options.lookup[sfPathProvider.stringify(options.path)] = f;
                return f;
            }
        };

        schemaFormProvider.defaults.string.unshift(wysiwyg);

        //Add to the bootstrap directive
        schemaFormDecoratorsProvider.addMapping('bootstrapDecorator', 'wysiwyg', 'directives/decorators/bootstrap/tinymce/tinymce.html');
        schemaFormDecoratorsProvider.createDirective('wysiwyg', 'directives/decorators/bootstrap/tinymce/tinymce.html');
    }
]);
