---
name: create-skill
description: "Create a reusable SKILL.md from a conversation, workflow, or repeated process. Use when packaging a step-by-step methodology into a skill, drafting the skill structure, or deciding what follow-up clarification is needed."
argument-hint: "What workflow should this skill capture, and should it be workspace-scoped or personal?"
---

# Create a Skill

Turn a repeated workflow into a reusable `SKILL.md` that is clear, scoped, and easy to invoke.

## When to Use

- The conversation shows a repeatable process the user wants captured
- The user asks to create, draft, refine, or debug a skill
- The user wants a reusable workflow with clear steps, decision points, and completion checks
- The user needs help choosing between a workspace-scoped skill and a personal skill

## Procedure

### 1. Extract the Workflow

Review the conversation history and identify:

- The step-by-step process being followed
- Decision points and branching logic
- Quality criteria or completion checks
- Any tools, files, or assets the workflow depends on

If the conversation does not expose a clear workflow, ask what outcome the skill should produce before drafting further.

### 2. Determine Scope

Confirm where the skill should live:

- `workspace` for project-specific or team-shared behavior
- `personal` for cross-workspace behavior

If the user does not specify scope, ask before finalizing the file path.

### 3. Draft the Skill

Write the skill with:

- Valid YAML frontmatter
- A description that includes the trigger phrases the agent should match on
- A concise `argument-hint` that tells the user what inputs to provide
- A body that explains when to use the skill, the workflow, and the done criteria

Keep the skill focused on one workflow. If the user is trying to cover multiple unrelated behaviors, split them into separate skills.

### 4. Validate the Draft

Check that:

- The frontmatter parses cleanly
- The file name matches the skill name
- The description is specific enough to trigger reliably
- The workflow is actionable, not generic
- Any ambiguous sections are called out for follow-up

### 5. Iterate With the User

After saving the first draft:

- Point out the most ambiguous or weak parts
- Ask targeted questions only about those parts
- Revise the skill once the scope and workflow details are clear

## Completion Criteria

A good `SKILL.md` should let another agent do the workflow without extra context. It should answer:

- What is the workflow for?
- When should it be used?
- What steps should the agent follow?
- What counts as done?
- Where does it live?

## Example Follow-Up Prompts

- "Make this a workspace skill for the ERP repo"
- "Refine the workflow to include branching when validation fails"
- "Turn this into a personal skill instead"
- "Add example prompts and a tighter description"
