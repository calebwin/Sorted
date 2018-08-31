var items = [
    "Animal Manure, Excrement",
    "Dead Animals",
    "Air Conditioners, Heat Pumps",
    "Microwaves",
    "Other Major Appliances",
    "Refrigerators, Freezers",
    "Small Household Appliances",
    "Asbestos-Containing Waste",
    "Alkaline Batteries",
    "Button Batteries",
    "Motor Vehicle Batteries",
    "Rechargeable Batteries",
    "Uninterruptible Power Supply (UPS) Batteries",
    "Carpet",
    "Carpet Padding",
    "Cleaning Products",
    "Acoustic Ceiling Tile",
    "Asphalt",
    "Asphalt Roofing",
    "Brick",
    "Concrete",
    "Drywall",
    "Fiberglass",
    "Plaster",
    "Porcelain",
    "Reusable Building Materials",
    "Rigid Foam Insulation Board",
    "Vermiculite Attic Insulation",
    "Wood",
    "Barrels and Drums",
    "Audio Video and Camera equipment",
    "Cell Phones, Smart Phones, Mobile Devices",
    "Computers, Laptops, Tablets",
    "Gaming Devices",
    "Monitors",
    "Printers, Copiers, Fax Machines, Peripherals",
    "TVs",
    "Fluorescent Light Ballasts",
    "Fluorescent Light Bulbs",
    "Fluorescent Light Tubes",
    "Edible food for donation",
    "Fats, Oil and Grease",
    "Food Scraps",
    "Foam Padding",
    "Household Furniture",
    "Mattresses",
    "Office Furniture",
    "Mixed Glass",
    "Separated Glass",
    "Window Glass",
    "Brush, Woody Waste",
    "Clean Sand",
    "Clean Soil",
    "Contaminated Sand",
    "Contaminated Soil",
    "Rock",
    "Yard Waste",
    "Aluminum Cans",
    "Ferrous Metals",
    "Nonferrous Metals",
    "Steel, Tin Cans",
    "Baby Supplies",
    "Bicycles and Bicycle Parts",
    "Eyeglasses",
    "General",
    "Medicines",
    "Smoke Detectors",
    "Paint",
    "Pallets",
    "Books",
    "Cardboard",
    "Confidential Documents",
    "Mixed Paper",
    "Newspaper",
    "Office Paper",
    "Phone Books",
    "Polycoated Cardboard",
    "Pulltabs",
    "Shredded Paper",
    "Pesticides",
    "Agricultural Plastic",
    "Bottles, Jugs and Tubs",
    "Mixed Plastics and Other Types of Plastics",
    "Packing Peanuts and Foam Blocks",
    "Plastic Film and Grocery Bags",
    "Plastic Nursery Pots",
    "Plastic Office Supplies",
    "Inkjet Cartridges",
    "Ribbon Cartridges",
    "Toner Cartridges",
    "Propane Tanks",
    "Medical Sharps",
    "Heating Oil Tanks",
    "Clothing, Shoes, and Fabrics",
    "Flags",
    "Mercury-Containing Thermostats",
    "Passenger, Truck, Motorcycle Tires",
    "Mercury Switches",
    "Motor Oil and Automotive Fluids",
    "Oversized Items",
    "Vehicles and Major Vehicle Parts"
];



function degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
}
// kilometers distance
function distanceCoords(lat1, lon1, lat2, lon2) {
    var earthRadiusKm = 6371;
    var dLat = degreesToRadians(lat2 - lat1);
    var dLon = degreesToRadians(lon2 - lon1);
    lat1 = degreesToRadians(lat1);
    lat2 = degreesToRadians(lat2);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadiusKm * c;
}

function showDialog(options) {
    options = $.extend({
        id: 'orrsDiag',
        title: null,
        text: null,
        negative: false,
        positive: false,
        cancelable: true,
        contentStyle: null,
        onLoaded: false
    }, options);

    // remove existing dialogs
    $('.dialog-container').remove();
    $(document).unbind("keyup.dialog");

    $('<div id="' + options.id + '" class="dialog-container"><div class="mdl-card mdl-shadow--16dp"></div></div>').appendTo("body");
    var dialog = $('#orrsDiag');
    var content = dialog.find('.mdl-card');
    if (options.contentStyle != null) content.css(options.contentStyle);
    if (options.title != null) {
        $('<h5>' + options.title + '</h5>').appendTo(content);
    }
    if (options.text != null) {
        $('<p>' + options.text + '</p>').appendTo(content);
    }
    if (options.negative || options.positive) {
        var buttonBar = $('<div class="mdl-card__actions dialog-button-bar"></div>');
        if (options.negative) {
            options.negative = $.extend({
                id: 'negative',
                title: 'Cancel',
                onClick: function() {
                    return false;
                }
            }, options.negative);
            var negButton = $('<button class="mdl-button mdl-js-button mdl-js-ripple-effect" id="' + options.negative.id + '">' + options.negative.title + '</button>');
            negButton.click(function(e) {
                e.preventDefault();
                if (!options.negative.onClick(e))
                    hideDialog(dialog)
            });
            negButton.appendTo(buttonBar);
        }
        if (options.positive) {
            options.positive = $.extend({
                id: 'positive',
                title: 'OK',
                onClick: function() {
                    return false;
                }
            }, options.positive);
            var posButton = $('<button class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" id="' + options.positive.id + '">' + options.positive.title + '</button>');
            posButton.click(function(e) {
                e.preventDefault();
                if (!options.positive.onClick(e))
                    hideDialog(dialog)
            });
            posButton.appendTo(buttonBar);
        }
        buttonBar.appendTo(content);
    }
    componentHandler.upgradeDom();
    if (options.cancelable) {
        dialog.click(function() {
            hideDialog(dialog);
        });
        $(document).bind("keyup.dialog", function(e) {
            if (e.which == 27)
                hideDialog(dialog);
        });
        content.click(function(e) {
            e.stopPropagation();
        });
    }
    setTimeout(function() {
        dialog.css({
            opacity: 1
        });
        if (options.onLoaded)
            options.onLoaded();
    }, 1);
}

function hideDialog(dialog) {
    $(document).unbind("keyup.dialog");
    dialog.css({
        opacity: 0
    });
    setTimeout(function() {
        dialog.remove();
    }, 400);
}
