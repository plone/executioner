Feature: Manage behaviors

    As admin user
    I want to add and remove behavors
    So that I can add more info to my content


    Scenario: Add a behavior to my container
        Given my container page
        When I add a new behavior
        Then the behavior is enabled

    #TBD: test implementation blocked by the confirmation pop-up
    #Scenario: Remove a behavior from my container


