import React from "react";
const Info = () => (
    <div className='infoContainer'>
        <h1>Information about the Kayaking Visualization Tool</h1>
        <div>
            This section will explain the available views in this tool works and
            what they are used for. A common element in all of these is the use
            of the actual route of the boat. It is shown as a map, with the boat
            being represented by a dot on the map. The speed of the boat is
            shown as a "tail" behind the boat. If the view uses a timespan, that
            span is shown in green on the plotted boat route. There is also a
            play-function for the timeline, that allows a user to play through
            the timeline and see how the data changes. Users can choose to play
            through each point of the selected timespan or, alternatively, to
            play the selected span width over the entire timeline. For most of
            the views, the variables can be de-selected (and selected) from the
            top variable menu at any time.
        </div>
        <h2>Compare all variables</h2>
        <div className='viewDescription'>
            <div>
                <h4>Parallel Coordinates</h4>
                This is meant to show all the variables alongside one another,
                which is done using a visualization technique called parallel
                coordinates. Each variable axis can be brushed to highlight data
                of a certain range.
            </div>
            <div>
                <h4>Box Plot</h4>
                This alternative view was created to only show the maximum and
                minium values of each variable in the selected timespan, along
                with the value at the chosen point in time. Hovering over a bar
                will reveal the actual values associated with that variable.
            </div>
        </div>
        <h2>Speed comparison</h2>
        <div className='viewDescription'>
            This view uses two separate techniques, apart from the boat route
            and timeline. On the top, there is a box-and-whiskers plot showing
            all selected variables other than the speed. The box will show the
            selected span, from max value to min value. On top of the box there
            is a small dot, representing the current value. There is also a line
            on the box showing the median value of the selection. Furthermore,
            the whiskers show the min and max of the entire dataset, which can
            be compared to the rest of the data. Finally, hovering over a box
            will reveal all the values associated with the box. Below that plot
            is a line chart that shows the speed and how it changes over the
            entire dataset. The points for the selection are marked, as well as
            the selected point.
        </div>
        <h2>Start analysis</h2>
        <div className='viewDescription'>
            This view allows users to divide the dataset up into multiple
            smaller parts. All of the selected starts are accessible from the
            menu on the right-hand side. If a user presses the plus-button, a
            new start is added and can be managed by adjusting the slider and
            observing how the boat route changes. The visualization has two
            alternatives:
            <div>
                <h4>Radar Chart + Box Plot</h4>
                Here all selected variables are shown for all selected start
                instances in a radar chart, which is a variant of the previously
                mentioned parallel coordinates plot. Furthermore, each start has
                its own box plot that can be expanded, if the user wants to see
                details. All values shown are relative to the maximum value of
                that variable in the data selection. The actual value can
                instead be accessed from the box plot.
            </div>
            <div>
                <h4>Line Chart</h4>
                This is an alternative view, where users can choose to see all
                variables as lines over time in the selected timespan. Variables
                can be filtered out and lines can be hovered for details.
            </div>
        </div>
        <h2>Boat movement</h2>
        <div className='viewDescription'>
            This view has to do with how the boat moves, specifically how the
            acceleration and rotation behaves over time. It is shown using two
            alternative views.
            <div>
                <h4>Boat View</h4>
                This custom view shows the top and back views of the boat, with
                small colored bars that show the rotation, acceleration or
                speed, depending on where they are relevant. At the bottom there
                is also a line graph showing all variables across the timespan.
                In the line chart, variables can be filtered out using the
                variable menu.
            </div>
            <div>
                <h4>Bubble Chart</h4>
                This view shows the acceleration and rotation as separate charts
                alongside one another. The selected point in time is shown in
                blue, while all other points in the selected timespan is shown
                in green. It is worth noting that the play function may not work
                as well for this view as for other views, since it takes a long
                time to load all data points in this kind of chart. Users can
                also hover over the legend at the bottom to fade out all points
                except for the selected point, for instance.
            </div>
        </div>
    </div>
);
export default Info;
