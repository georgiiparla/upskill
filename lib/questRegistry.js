/**
 * Centralized Quest Registry for Frontend
 * Maps directly to backend/config/quests.yml
 * 
 * Use this to reference quests without hardcoding strings
 * Example: QuestRegistry.codes.GIVE_FEEDBACK
 */

export const QuestRegistry = {
  // Quest codes as constants for type safety
  codes: {
    CREATE_FEEDBACK_REQUEST: 'create_feedback_request',
    GIVE_FEEDBACK: 'give_feedback',
    LIKE_FEEDBACK: 'like_feedback',
    UPDATE_AGENDA: 'update_agenda',
    DAILY_LOGIN: 'daily_login',
  },

  // Complete quest definitions
  quests: {
    create_feedback_request: {
      code: 'create_feedback_request',
      title: 'First Feedback Request',
      description: 'Submit a feedback request to get input from your peers',
      points: 25,
      explicit: true,
      category: 'feedback',
      repeatable: false,
    },
    give_feedback: {
      code: 'give_feedback',
      title: 'Give Feedback',
      description: 'Provide constructive feedback on someone\'s request',
      points: 50,
      explicit: true,
      category: 'feedback',
      repeatable: false,
    },
    like_feedback: {
      code: 'like_feedback',
      title: 'Like Feedback',
      description: 'Show your appreciation by liking quality feedback',
      points: 10,
      explicit: true,
      category: 'engagement',
      repeatable: true,
    },
    update_agenda: {
      code: 'update_agenda',
      title: 'Update Your Agenda',
      description: 'Keep your agenda items up to date for better team alignment',
      points: 15,
      explicit: false,
      category: 'admin',
      repeatable: true,
    },
    daily_login: {
      code: 'daily_login',
      title: 'Daily Login',
      description: 'Log in daily to stay connected and earn points',
      points: 5,
      explicit: false,
      category: 'system',
      repeatable: true,
    },
  },

  /**
   * Get a quest by code
   * @param {string} code - Quest code
   * @returns {Object|null} Quest definition
   */
  find(code) {
    return this.quests[code] || null;
  },

  /**
   * Get all quests
   * @returns {Object} All quests
   */
  all() {
    return this.quests;
  },

  /**
   * Get explicit quests only (shown in UI)
   * @returns {Object} Explicit quests
   */
  explicitOnly() {
    return Object.values(this.quests).filter(q => q.explicit);
  },

  /**
   * Get implicit quests only (hidden from UI)
   * @returns {Object} Implicit quests
   */
  implicitOnly() {
    return Object.values(this.quests).filter(q => !q.explicit);
  },

  /**
   * Check if quest exists
   * @param {string} code - Quest code
   * @returns {boolean}
   */
  exists(code) {
    return !!this.quests[code];
  },

  /**
   * Get quests by category
   * @param {string} category - Category name
   * @returns {Object[]} Quests in category
   */
  byCategory(category) {
    return Object.values(this.quests).filter(q => q.category === category);
  },

  /**
   * Get repeatable quests only
   * @returns {Object[]} Repeatable quests
   */
  repeatableOnly() {
    return Object.values(this.quests).filter(q => q.repeatable);
  },

  /**
   * Get non-repeatable quests only
   * @returns {Object[]} Non-repeatable quests
   */
  nonRepeatableOnly() {
    return Object.values(this.quests).filter(q => !q.repeatable);
  },
};
