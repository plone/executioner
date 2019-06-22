Feature: Permission settings

    As admin user
    I want to create roles
    So that I can share content

    Scenario: Share container
        Given my container page
        When I open permission editor
        And I share with a user
        And I save changes
        Then permissions updated toast is displayed

