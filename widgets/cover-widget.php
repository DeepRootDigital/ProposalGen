<?php
/*
  Widget Name: Cover Page
  Description: This widget is a coverpage.
  Version: 1.0
  Author: Business On Market St
  Author URI: http://www.businessonmarketst.com
 */

class CoverPageWidget extends WP_Widget {

    function centeredTextWidget() {
        $widget_ops = array(
            'classname' => 'CoverPageWidget',
            'description' => 'This is a coverpage widget'
        );

        $this->WP_Widget(
                'centeredTextWidget', 'Proposal Gen - Cover Page Widget', $widget_ops
        );
    }

    function widget($args, $instance) { // widget sidebar output
        extract($args, EXTR_SKIP);

        /* Our variables from the widget settings. */
        $title = $instance['title'];
        $bgcolor = $instance['background-color'];


        // YOUR DISPLAY OUTPUT GOES HERE!!!!!!!


        echo '<div style="background-color:' . $bgcolor . ';" class="viewport colored">';
        echo '<div class="container">';
        //Remove ID Quirks from CSS
        echo '<div class="cover-page" id="sect2">';
        //Please Change the Section Image Moniker Accordingly
        echo '<img src = "images/slide-images/section-two-moniker.png" class = "section-moniker">';
        echo '<h2>' . $title . '</h2>';
        echo '<div class = "slider-navigation">';
        echo '<img class = "previous" src = "images/prev-button.png">';
        echo '<img class = "next" src = "images/next-button.png">';
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
        $instance['background-color'] = strip_tags($new_instance['background-color']);

        return $instance;
    }

    /**
     * Displays the widget settings controls on the widget panel.
     * Make use of the get_field_id() and get_field_name() function
     * when creating your form elements. This handles the confusing stuff.
     */
    function form($instance) {

        /* Set up some default widget settings. */
        $defaults = array('title' => __('title', 'example'), 'background-color' => __('background-color', 'example'),);
        $instance = wp_parse_args((array) $instance, $defaults);
        ?>

        <!-- Title: Text Input -->
        <p>
            <label for="<?php echo $this->get_field_id('background-color'); ?>"><?php _e('Background Color:', 'hybrid'); ?></label>
            <input id="<?php echo $this->get_field_id('background-color'); ?>" name="<?php echo $this->get_field_name('background-color'); ?>" value="<?php echo $instance['background-color']; ?>" style="width:100%;" />
        </p>
        <p>
            <label for="<?php echo $this->get_field_id('title'); ?>"><?php _e('Title:', 'hybrid'); ?></label>
            <input id="<?php echo $this->get_field_id('title'); ?>" name="<?php echo $this->get_field_name('title'); ?>" value="<?php echo $instance['title']; ?>" style="width:100%;" />
        </p>

        <?php
    }

}

add_action(
        'widgets_init', create_function('', 'return register_widget("centeredTextWidget");')
);
?>