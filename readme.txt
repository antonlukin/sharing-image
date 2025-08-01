=== Sharing Image ===
Contributors: antonlukin
Donate link: https://wpset.org/about/
Tags: social image, sharing image, og image, facebook, twitter
Requires at least: 5.3
Tested up to: 6.8.2
Stable tag: 3.7
Requires PHP: 5.5
License: GPLv2 or later

Sharing Image is a WordPress plugin for generating sharing posters in social networks.

== Description ==
Sharing Image is a WordPress plugin for generating sharing posters in social networks. Allows you to use text, watermarks and various filters. It is possible to create different posters for any posts types, archives and taxonomies. Compatible with various SEO plugins.

Custom posters draw attention to your social media links and make them stand out from the rest in your feed. You can also place your company logo as a watermark to increase your brand awareness. If you are posting video or audio, it can be a good idea to add a play icon to your poster to help users identify the type of content.

= Get support =
First of all read the [plugin documentation](https://wpset.org/sharing-image/). If you find a bug or want to add new feature to this plugin, create new [issue](https://github.com/antonlukin/sharing-image/issues) on Github or send a [pull reguest](https://github.com/antonlukin/sharing-image/pulls).

= Premium =

The Premium version of the plugin adds new features and helps the product develop. While the plugin is in beta testing, it is absolutely free.
Read more on the [plugin page](https://wpset.org/sharing-image/#premium).

== Screenshots ==
1. Example of a poster in Twitter feed
2. Create poster template via plugin Settings
3. Generate Sharing Image poster for certain post

== Changelog ==

= 3.7 =
* Fix buggy composer autoload file

= 3.6 =
* Remove dev required dependencies from repo

= 3.5 =
* Updated PosterEditor library to 6.0.
* Fixed load_text_domain error for WP 6.8+.

= 3.4 =
* Fixed duplicate layers key names on templates cloning.
* Fixed undefined preset fields.
* Updated PosterEditor library.
* Rebuild autogenerate_poster method.

= 3.3 =
* Add ability to create uppercased text layer.
* Add admin-side titles to all layers.
* Fix manual generation issue on doing cron.
* Add handlers for instant premium plugin version.

= 3.2 =
* Fixed post status checks and default template for auto-generating posters.
* Added transparency to the template's text and image layers.
* Fixed auto-generation bug that occurred if a poster was deleted.
* Updated PosterEditor library to the latest version.

= 3.1 =
* Fixed auto-generation bug when changing post status.
* Fixed preset race-condition bug in the Gutenberg sidebar.
* Added `get_autogenerate_index` filter.

= 3.0 =
* Updated PosterEditor library
* Redesigned template settings page
* Added new layer settings
* Redesigned template auto-generation
* Added import and export of templates
* Added demo template
* Added template cloning
* Changed the approach to meta tags output
* Added Gutenberg widget
* See the list of updated hooks on the plugin page: https://wpset.org/sharing-image/hooks/

= 2.0.17 =
* Fix missing translation handler in settings editor
* Fix bug with redirect message in settings class

= 2.0.16 =
* Added optional $context parameter to `sharing_image_prepare_template` filter
* Added GIF Poster image format to plugin configuration

= 2.0.15 =
* Added optional $screen_id parameter to `sharing_image_prepare_template` filter
* Updated packages

= 2.0.14 =
* Fixed poster background opacity on template editor screen
* Fixed js obfuscation for i18n functions

= 2.0.13 =
* Added second parameter to sharing_image_poster and sharing_image_poster_src public functions
* Fixed notice on empty Post ID property
* Minor code improvements

= 2.0.12 =
* Added filter to disable posters autogeneration according post id.
* Updated HTML meta tags to be able to display Twitter cards.

= 2.0.11 =
* Added the ability to autogenerate posters for entries added programmatically, for example, via cron.

= 2.0.10 =
* Updated PosterEditor class to fix default opacity canvas.
* Fixed param type in phpdoc block.

= 2.0.9 =
* Fixed bug with default autogenerate template on config page.

= 2.0.8 =
* Added automatic poster generation.
* Prepared for use new `sharing_image_autogenerated_poster` filter.

= 2.0.7 =
* Fixed a bug with layer image sizes.
* Added the ability to collapse layer on the settings page.
* Trying to fix undeclared wp.data error.

= 2.0.6 =
* Replaced official plugin site url.

= 2.0.5 =
* Fixed `sharing_image_hide_meta` filter.

= 2.0.4 =
* Fixed a bug with non-saved radio buttons in the template settings.
* Added a detailed description of the error when requesting Premium.

= 2.0.3 =
* Replaced `sharing_image_allow_custom_fonts` filter with `sharing_image_disable_custom_fonts`.

= 2.0.2 =
* Updated readme and add WordPress catalog assets.

= 2.0.0 =
* Initial version for WordPress Plugin Directory.