<?php
/**
 * Templates plugin functions.
 *
 * @package sharing-image
 * @author  Anton Lukin
 */

if ( ! defined( 'ABSPATH' ) ) {
	die;
}

if ( ! function_exists( 'sharing_image_poster' ) ) {
	/**
	 * Public function to get Sharing Image poster url.
	 *
	 * @param int    $object_id   Optional. Post ID or Taxonomy term ID.
	 * @param string $object_type Optional. Requested meta type, can be singular or taxonomy.
	 *                            Default is determined by the type of the template in which it is called.
	 */
	function sharing_image_poster( $object_id = null, $object_type = null ) {
		return ( new Sharing_Image\Meta() )->get_poster( $object_id, $object_type );
	}
}

if ( ! function_exists( 'sharing_image_poster_src' ) ) {
	/**
	 * Public function to get Sharing Image poster data.
	 * Return image url, width and height.
	 *
	 * @param int    $object_id   Optional. Post ID or Taxonomy term ID.
	 * @param string $object_type Optional. Requested meta type, can be singular or taxonomy.
	 *                            Default is determined by the type of the template in which it is called.
	 */
	function sharing_image_poster_src( $object_id = null, $object_type = null ) {
		return ( new Sharing_Image\Meta() )->get_poster_src( $object_id, $object_type );
	}
}


function create_custom_post_type() {
    $labels = array(
        'name'                  => _x('Пример Поста', 'Post type general name', 'textdomain'),
        'singular_name'         => _x('Пример Поста', 'Post type singular name', 'textdomain'),
        'menu_name'             => _x('Пример Поста', 'Admin Menu text', 'textdomain'),
        'name_admin_bar'        => _x('Пример Поста', 'Add New on Toolbar', 'textdomain'),
        'add_new'               => __('Добавить Новый', 'textdomain'),
        'add_new_item'          => __('Добавить Новый Пример Поста', 'textdomain'),
        'new_item'              => __('Новый Пример Поста', 'textdomain'),
        'edit_item'             => __('Редактировать Пример Поста', 'textdomain'),
        'view_item'             => __('Просмотреть Пример Поста', 'textdomain'),
        'all_items'             => __('Все Примеры Постов', 'textdomain'),
        'search_items'          => __('Поиск Примеров Постов', 'textdomain'),
        'parent_item_colon'     => __('Родительский Пример Поста:', 'textdomain'),
        'not_found'             => __('Примеры Постов не найдены.', 'textdomain'),
        'not_found_in_trash'    => __('Примеры Постов в корзине не найдены.', 'textdomain'),
        'featured_image'        => _x('Изображение Примера Поста', 'Overrides the “Featured Image” phrase for this post type. Added in 4.3', 'textdomain'),
        'set_featured_image'    => _x('Установить изображение Примера Поста', 'Overrides the “Set featured image” phrase for this post type. Added in 4.3', 'textdomain'),
        'remove_featured_image' => _x('Удалить изображение Примера Поста', 'Overrides the “Remove featured image” phrase for this post type. Added in 4.3', 'textdomain'),
        'use_featured_image'    => _x('Использовать как изображение Примера Поста', 'Overrides the “Use as featured image” phrase for this post type. Added in 4.3', 'textdomain'),
        'archives'              => _x('Архивы Примера Поста', 'The post type archive label used in nav menus. Default “Post Archives”. Added in 4.4', 'textdomain'),
        'insert_into_item'      => _x('Вставить в Пример Поста', 'Overrides the “Insert into post”/“Insert into page” phrase (used when inserting media into a post). Added in 4.4', 'textdomain'),
        'uploaded_to_this_item' => _x('Загружено в этот Пример Поста', 'Overrides the “Uploaded to this post”/“Uploaded to this page” phrase (used when viewing media attached to a post). Added in 4.4', 'textdomain'),
        'filter_items_list'     => _x('Фильтр списка Примеров Постов', 'Screen reader text for the filter links heading on the post type listing screen. Default “Filter posts list”. Added in 4.4', 'textdomain'),
        'items_list_navigation' => _x('Навигация по списку Примеров Постов', 'Screen reader text for the pagination heading on the post type listing screen. Default “Posts list navigation”. Added in 4.4', 'textdomain'),
        'items_list'            => _x('Список Примеров Постов', 'Screen reader text for the items list heading on the post type listing screen. Default “Posts list”. Added in 4.4', 'textdomain'),
    );

    $args = array(
        'labels'             => $labels,
        'public'             => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'query_var'          => true,
        'rewrite'            => array('slug' => 'example_post'),
        'capability_type'    => 'post',
        'has_archive'        => true,
        'hierarchical'       => false,
        'menu_position'      => null,
        'supports'           => array('title', 'editor', 'author', 'thumbnail', 'excerpt', 'comments'),
    );

    register_post_type('example_post', $args);
}

add_action('init', 'create_custom_post_type');