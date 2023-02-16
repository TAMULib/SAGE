sage.filter('simpleAscii', function() {
  return function(text, usedOps) {
    var sanitized = "";
    var digit = 0;

    if (angular.isDefined(text) && angular.isString(text)) {
      for (var i = 0; i < text.length; i++) {
        digit = text.charCodeAt(i);

        if (digit > 0x2F && digit < 0x3A) {
          sanitized += text[i];
        } else if (digit > 0x40 && digit < 0x5B) {
          sanitized += text[i];
        } else if (digit > 0x60 && digit < 0x7B) {
          sanitized += text[i];
        } else {
          switch (digit) {
            case 0x2B:
            case 0x2D:
            case 0x2E:
            case 0x5F:
            case 0x7E:
              sanitized += text[i];
              break;

            default:
              // Two-byte UTF-8.
              if ((digit & 0xe0) == 0xc0) {
                i++;
              }
              // Three-byte UTF-8.
              else if ((digit & 0xf0) == 0xe0) {
                i += 2;
              }
              // Four-byte UTF-8.
              else if ((digit & 0xf8) == 0xf0) {
                i += 3;
              }

              break;
          }
        }
      }
    }

    return sanitized;
  };
});
