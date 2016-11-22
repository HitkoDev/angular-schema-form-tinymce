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
                f.tinymceOptions.plugins = f.tinymceOptions.plugins || 'advlist autolink lists link image hr searchreplace wordcount visualblocks visualchars code fullscreen table directionality paste textcolor colorpicker textpattern imagetools'
                f.tinymceOptions.toolbar1 = f.tinymceOptions.toolbar1 || 'undo redo | styleselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link unlink image'
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
