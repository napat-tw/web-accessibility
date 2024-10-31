import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('Jest Axe Rules', () => {
  it('should demonstrate this matcher`s usage with a custom config', async () => {
    const render = () => `
      <div>
        <img src='#'/>
      </div>
    `

    const html = render()
  
    const results = await axe(html, {
      rules: {
        // For demonstration only, don't disable rules that need fixing.
        // https://github.com/dequelabs/axe-core/blob/master/doc/rule-descriptions.md
        'region': { enabled: false },
        'image-alt': { enabled: false }
      }
    })
  
    expect(results).toHaveNoViolations()
  })
});
