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
                f.tinymceOptions = f.tinymceOptions || {};
                f.tinymceOptions.setup = function (editor) {
                    f.editor = editor
                };
                f.toggleEditor = function () {
                    if (f.editor.hidden) {
                        f.editor.show()
                    } else {
                        f.editor.hide()
                    }
                };
                options.lookup[sfPathProvider.stringify(options.path)] = f;
                return f;
            }
        };

        schemaFormProvider.defaults.string.unshift(wysiwyg);

        // Add to the bootstrap directive
        schemaFormDecoratorsProvider.addMapping('bootstrapDecorator', 'wysiwyg', 'directives/decorators/bootstrap/tinymce/tinymce.html');
        schemaFormDecoratorsProvider.createDirective('wysiwyg', 'directives/decorators/bootstrap/tinymce/tinymce.html');
    }
]);
