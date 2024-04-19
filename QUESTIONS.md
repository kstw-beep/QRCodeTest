## Assumptions, plan of attack, things you should know and general thoughts-

QR Code Monkey has several tabs for source types for which you can generate qrcodes for.
For the sake of this assessment test, I have chosen to stick with tests for the url tab.
However, if I were writing tests for this page on a longer timeline and trying to make the tests more sustainable,
I would utilize utils and cypress command files to package up some of the common functions across all tabs in order to reduce redundancy while iterating out tests.

I would also refactor a lot of the redundant code into custom commands, especially since most if not all the source types for
qr codes have the same customize options. This would make it easier to iterate out the tests for each type without duplicating too much code. I would also create a cleanup function for downloaded qr codes.

Also, in a real world scenario, I would push for/integrate more consistent test-ids on the front end to allow for more robust element targeting.

## Proposed Other tests:

- Actually uploading an image to the logo image uploader
- Iterating tests out to the other source types (ones with highest traffic first)
- support for other platforms and screen sizes (mweb)
- testing coverage for all supported languages
- coverage for all settings options
