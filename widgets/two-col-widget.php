<?php
/*
  Widget Name: Two Column HTML Content Page
  Description: This widget is a content page.
  Version: 1.0
  Author: Business On Market St
  Author URI: http://www.businessonmarketst.com
 */

  class twoColfreeformPageWidget extends WP_Widget {

    function twoColfreeformPageWidget() {
        $widget_ops = array(
            'classname' => 'twoColfreeformPageWidget',
            'description' => 'This is a freeform html accepting two column content widget'
            );

        $this->WP_Widget(
            'twoColfreeformPageWidget', 'Proposal Gen - HTML Content Page Widget', $widget_ops
            );
    }

    function widget($args, $instance) { // widget sidebar output
        extract($args, EXTR_SKIP);

        /* Our variables from the widget settings. */
        $coltitle = $instance['coltitle'];
        $title = $instance['title'];
        $column1content = $instance['column1content'];
        $column2content = $instance['column2content'];

        // YOUR DISPLAY OUTPUT GOES HERE!!!!!!!

        echo '<div class="viewport discipline">';
        echo '<div class="container">';
        echo '<div class="left-col">';
        echo '<h3>'.$coltitle.'</h3>';
        echo '</div>';
        echo '<div class="right-col">';
        echo '<div class="slide-title">';
        echo '<h2>'.$title.'</h2>';
        echo '<img src="images/mk-icon.png" class="icon" alt="research">';
        echo '</div>';
        echo '<div class="col">';
        echo $column1content;
        echo '</div>';
        echo '<div class="col extended">';
        echo $column2content;
        echo '</div>';
        echo '</div>';
        echo '<div class="slider-navigation">';
        echo '<img class="previous" src="'.get_template_directory_uri().'images/prev-button.png">';
        echo '<img class="next" src="'.get_template_directory_uri().'images/next-button.png">';
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
        $instance['coltitle'] = strip_tags($new_instance['coltitle']);
        $instance['title'] = strip_tags($new_instance['title']);
        $instance['column1content'] = $new_instance['column1content'];
        $instance['column2content'] = $new_instance['column2content'];

        return $instance;
    }

    /**
     * Displays the widget settings controls on the widget panel.
     * Make use of the get_field_id() and get_field_name() function
     * when creating your form elements. This handles the confusing stuff.
     */
    function form($instance) {

        /* Set up some default widget settings. */
        $defaults = array('coltitle' => __('coltitle', 'example'), 'title' => __('title', 'example'), 'column1content' => __('column1content', 'example'),'column2content' => __('column2content', 'example'),);
        $instance = wp_parse_args((array) $instance, $defaults);
        ?>

        <!-- Title: Text Input -->
        <p>
            <label for="<?php echo $this->get_field_id('coltitle'); ?>"><?php _e('Side Column Title:', 'hybrid'); ?></label>
            <input id="<?php echo $this->get_field_id('coltitle'); ?>" name="<?php echo $this->get_field_name('coltitle'); ?>" value="<?php echo $instance['coltitle']; ?>" style="width:100%;" />
        </p>
        <p>
            <label for="<?php echo $this->get_field_id('title'); ?>"><?php _e('Title:', 'hybrid'); ?></label>
            <input id="<?php echo $this->get_field_id('title'); ?>" name="<?php echo $this->get_field_name('title'); ?>" value="<?php echo $instance['title']; ?>" style="width:100%;" />
        </p>
        <p>
            <label for="<?php echo $this->get_field_id('column1content'); ?>"><?php _e('Page Content:', 'hybrid'); ?></label>
            <textarea id="<?php echo $this->get_field_id('column1content'); ?>" name="<?php echo $this->get_field_name('column1content'); ?>" style="width:100%;" ><?php echo $instance['column1content']; ?></textarea>
        </p>
        <p>
            <label for="<?php echo $this->get_field_id('column2content'); ?>"><?php _e('Page Content:', 'hybrid'); ?></label>
            <textarea id="<?php echo $this->get_field_id('column2content'); ?>" name="<?php echo $this->get_field_name('column2content'); ?>" style="width:100%;" ><?php echo $instance['column2content']; ?></textarea>
        </p>

        <?php
    }

}

add_action(
    'widgets_init', create_function('', 'return register_widget("twoColfreeformPageWidget");')
    );
?>