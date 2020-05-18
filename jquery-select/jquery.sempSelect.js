;(function($) {
    var SempSelect = function (el, options) {
        this.options = options
        this.$el = $(el)
        this.$el_ = this.$el.clone()

        this.selValue = null

        this.init()
    }

    // 默认配置
    SempSelect.DEFAULTS = {
        width: 250,
        data: [
            { value: 1, label: 'XX项目1' },
            { value: 2, label: 'XX项目2' },
            { value: 3, label: 'XX项目3' },
            { value: 4, label: 'XX项目4' }
        ]
    }

    // 事件
    SempSelect.EVENTS = {

    }

    // 方法
    SempSelect.METHODS = [
        'value',
        'loadData'
    ]

    SempSelect.prototype.init = function () {
        this.initContainer()
        this.initData()
    }

    SempSelect.prototype.initContainer = function() {
        this.$container = $([
            '<div class="semp-select-wrapper">',
                '<div class="semp-select-label"></div>',
                '<div class="semp-select-icon"></div>',
            '</div>'
        ].join(''))

        this.$dropDownContainer = $('<div class="semp-select-dorpdown"></div>')

        this.$container.insertAfter(this.$el)
        this.$resultShow = this.$container.find('.semp-select-label')

        
        this.$el.hide()

        $('body').append(this.$dropDownContainer)

        this.$container.width(this.options.width)
        this.$dropDownContainer.width(this.options.width)

        var that = this
        this.$container.click(function(evt) {
            evt.stopPropagation()
            
            var offset = that.$container.offset()
            var height = that.$container.height()

            that.$dropDownContainer.css({
                left: offset.left,
                top: offset.top + height + 5
            })

            that.$dropDownContainer.fadeIn()
            that.$container.addClass('active')
        })

        $('body').click(function() {
            that.$dropDownContainer.fadeOut()
            that.$container.removeClass('active')
        })

        this.$dropDownContainer.on('click', '.semp-select-item', function() {
            that.$resultShow.text($(this).text())
            that.selValue = $(this).data('value')
        })
    }

    SempSelect.prototype.initData = function() {
        this.$resultShow.text('')
        this.selValue = null

        var listHtml = ''
        for (var i = 0; i < this.options.data.length; i++) {
            var item = this.options.data[i]
            listHtml += '<div class="semp-select-item" data-value=' + item.value + '>' + item.label + '</div>'
        }

        this.$dropDownContainer.empty().append(listHtml)
    }

    SempSelect.prototype.value = function(value) {
        if (!value) {
            return this.selValue
        }

        for (var i = 0; i < this.options.data; i++) {
            if (this.options.data[i].value == value) {
                this.selValue = value
                this.$resultShow.text(this.options.data[i].label)
                break
            }
        }
    }

    SempSelect.prototype.loadData = function(data) {
        if (!$.isArray(data)) {
            return            
        }

        this.options.data = data
        this.initData()
    }

    $.fn.sempSelect = function(option) {
        var value,
            args = Array.prototype.slice.call(arguments, 1)

        this.each(function () {
            var $this = $(this),
                data = $this.data('semp.select')

            if (!data) {
                var options = $.extend({}, SempSelect.DEFAULTS, typeof option === 'object' ? option : {})
                $this.data('semp.select', new SempSelect(this, options))
                return 
            }

            // 方法调用
            if (typeof option === 'string') {
                if ($.inArray(option, SempSelect.METHODS) < 0) {
                    throw new Error('未知方法' + option)
                }

                if (!data) {
                    return
                }

                value = data[option].apply(data, args)

                if (option === 'destroy') {
                    
                }
            }
        })

        // 传递 jquery 的链式调用
        return typeof value === 'undefined' ? this : value
    }

    $.fn.sempSelect.Constructor = SempSelect
}(jQuery))