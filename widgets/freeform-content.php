<?php
/*
  Widget Name: Freeform Content Page
  Description: This widget is a content page.
  Version: 1.0
  Author: Business On Market St
  Author URI: http://www.businessonmarketst.com
 */

class freeformPageWidget extends WP_Widget {

    function freeformPageWidget() {
        $widget_ops = array(
            'classname' => 'freeformPageWidget',
            'description' => 'This is a freeform html accepting content widget'
        );

        $this->WP_Widget(
                'freeformPageWidget', 'Proposal Gen - HTML Content Page Widget', $widget_ops
        );
    }

    function widget($args, $instance) { // widget sidebar output
        extract($args, EXTR_SKIP);

        /* Our variables from the widget settings. */
        $title = $instance['title'];
        $pagecontent = $instance['pagecontent'];

        // YOUR DISPLAY OUTPUT GOES HERE!!!!!!!

        echo '<div class="viewport">';
        echo '<div class="container">';
        echo '<div class="content-slide">';
        echo '<h3>' . $title . '</h3>';
        echo $pagecontent;
        echo '<div class="slider-navigation">';
        echo '<img class="previous" src="' . get_template_directory_uri() . '/images/prev-button.png">';
        echo '<img class="next" src="' . get_template_directory_uri() . '/images/next-button.png">';
        echo '</div>';
        echo '</div>';
        echo '</div>';
        echo '</div>';
    }

    /**
     * Update the widget settings.
     * */
    function update($new_instance, $old_instance) {
        $instance = $old_instance;

        /* Strip tags for title and name to remove HTML (important for text inputs). */
        $instance['title'] = strip_tags($new_instance['title']);
        $instance['pagecontent'] = $new_instance['pagecontent'];

        return $instance;
    }

    /**
     * Displays the widget settings controls on the widget panel.
     * Make use of the get_field_id() and get_field_name() function
     * when creating your form elements. This handles the confusing stuff.
     */
    function form($instance) {

        /* Set up some default widget settings. */
        $defaults = array('title' => __('title', 'example'), 'pagecontent' => __('pagecontent', 'example'),);
        $instance = wp_parse_args((array) $instance, $defaults);
        ?>

        <!-- Title: Text Input -->
        <p>
            <label for="<?php echo $this->get_field_id('title'); ?>"><?php _e('Title:', 'hybrid'); ?></label>
            <input id="<?php echo $this->get_field_id('title'); ?>" name="<?php echo $this->get_field_name('title'); ?>" value="<?php echo $instance['title']; ?>" style="width:100%;" />
        </p>
        <p>
            <label for="<?php echo $this->get_field_id('pagecontent'); ?>"><?php _e('Page Content:', 'hybrid'); ?></label>
            <textarea id="<?php echo $this->get_field_id('pagecontent'); ?>" name="<?php echo $this->get_field_name('pagecontent'); ?>" style="width:100%;" ><?php echo $instance['pagecontent']; ?></textarea>
        </p>

        <?php
    }

}

add_action(
        'widgets_init', create_function('', 'return register_widget("freeformPageWidget");')
);
?>