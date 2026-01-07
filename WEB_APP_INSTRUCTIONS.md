# Web Application Development Instructions

```xml
<web_app_instructions>
  The following instructions guide how you should handle web application development using Vite, React, and TypeScript. These standards ensure code consistency, quality, and a cohesive development experience across all projects.

  CRITICAL: You MUST create pages in the `/src/pages` folder to be used as route components. This is non-negotiable and should be registered in App.tsx routing before any other modifications.
  CRITICAL: These instructions apply to all web app development when using this template.
  CRITICAL: All apps must be visually stunning, highly interactive, and content-rich:
    - Design must be modern, beautiful, and unique—avoid generic or template-like layouts.
    - Use advanced UI/UX patterns: cards, lists, tabs, modals, carousels, and custom navigation.
    - Ensure the navigation is intuitive and easy to understand.
    - Integrate high-quality images, icons, and illustrations (e.g., Unsplash, lucide-react).
    - Implement smooth animations, transitions, and micro-interactions for a polished experience.
    - Ensure thoughtful typography, color schemes, and spacing for visual hierarchy.
    - Add interactive elements: search, filters, forms, and feedback (loading, error, empty states).
    - Avoid minimal or empty screens—every screen should feel complete and engaging.
    - Apps should feel like a real, production-ready product, not a demo or prototype.
    - All designs MUST be beautiful and professional, not cookie cutter.
    - Implement unique, thoughtful user experiences.
    - Focus on clean, maintainable code structure.
    - Every component must be properly typed with TypeScript.
    - All UI must be responsive and work across all screen sizes.
  IMPORTANT: Make sure to follow the instructions below to ensure a successful web application development process. The project structure must follow what has been provided.
  IMPORTANT: When creating a web app, you must ensure the design is beautiful and professional, not cookie cutter.
  IMPORTANT: NEVER try to create image files (e.g., png, jpg, etc.).
  IMPORTANT: Any app you create must be heavily featured and production-ready; it should never just be plain and simple, including placeholder content unless the user requests not to.
  CRITICAL: Apps must always have a navigation system:
    Primary Navigation:
      - React Router-based navigation
      - Main pages and sections easily accessible
    
    Secondary Navigation:
      - Nested routes for hierarchical flows
      - Modals and dialogs for overlays
      - Sidebar or dropdown menus for additional navigation
  IMPORTANT: EVERY app must follow React best practices and web development standards.

  <core_requirements>
    - Version: 2025
    - Platform: Web-first with responsive design
    - Framework: React 19+
    - Build Tool: Vite 5+
    - Type: Single Page Application (SPA)
    - Routing: React Router 6+
    - State Management: TanStack Query 5+
  </core_requirements>

  <project_structure>
    /src                          # All source code
      ├── App.tsx                # Root component with routing
      ├── main.tsx               # Entry point
      ├── index.css              # Global styles
      ├── App.css                # App styles
      ├── vite-env.d.ts          # Type definitions
      ├── pages/                 # Page components (required)
      │   ├── Index.tsx          # Home page (required)
      │   └── NotFound.tsx       # 404 page (required)
      ├── components/            # Reusable components
      │   ├── NavLink.tsx        # Navigation component
      │   └── ui/                # shadcn/ui components
      │       ├── button.tsx
      │       ├── card.tsx
      │       ├── dialog.tsx
      │       ├── input.tsx
      │       ├── select.tsx
      │       └── ... (other UI components)
      ├── hooks/                 # Custom React hooks
      │   ├── use-mobile.tsx     # Mobile detection
      │   └── use-toast.ts       # Toast notifications
      ├── lib/                   # Utility functions
      │   └── utils.ts           # Common utilities
      └── types/                 # TypeScript types (optional)
    /public                      # Static assets
  </project_structure>

  <critical_requirements>
    <routing_system>
      CRITICAL: All routes must be defined in App.tsx within the Routes component
      - Use React Router v6 for routing management
      - All page components MUST be in /src/pages folder
      - Page components MUST be registered in App.tsx with Route elements
      - Route format: <Route path="/path" element={<PageComponent />} />
      - Always preserve the 404 catch-all route: <Route path="*" element={<NotFound />} />
      - Support dynamic route parameters: <Route path="/item/:id" element={<ItemPage />} />
      - Implement graceful route error handling
      - Maintain clear and consistent route paths
      - Use nested routes for hierarchical structures
      - Page components should correspond to logical sections of the application
      - All custom routes MUST be added ABOVE the catch-all "*" route
    </routing_system>

    <component_requirements>
      CRITICAL: NO NEW COMPONENTS CAN BE CREATED - ONLY USE EXISTING UI COMPONENTS
      - Every component must have complete TypeScript type annotations
      - All props must be explicitly typed with interfaces or types
      - Use React.FC<Props> for functional component typing
      - Implement proper loading and error states
      - Handle edge cases and empty states
      - Create reusable, cohesive, and loosely coupled components
      - Follow single responsibility principle
      - Export and import components consistently
      - Use Props interfaces to define clear component APIs
      - Implement proper prop validation
      - Use children prop for flexible component composition
      - Create semantic and accessible components
      - Implement proper React hooks patterns
      - Use useCallback and useMemo for optimization
      - IMPORTANT: Page and feature components may be created in /src/pages and /src/components/
      - IMPORTANT: ONLY UI/presentational components must come from /src/components/ui/
      - IMPORTANT: Custom utilities and logic hooks are allowed in /src/hooks/
      - IMPORTANT: Do NOT create new UI/styled components in /src/components/
    </component_requirements>

    <ui_component_library>
      CRITICAL: All UI components are pre-installed in /src/components/ui
      CRITICAL: YOU MUST ONLY USE COMPONENTS FROM /src/components/ui - NO NEW COMPONENTS CAN BE CREATED
      - Always prioritize shadcn/ui components from the template
      - All components are ready to use—no installation needed
      - Import components directly from @/components/ui/[component-name]
      - Follow shadcn/ui design patterns for consistency
      - Use Radix UI primitives for advanced customization
      - Maintain visual consistency with existing components
      - Extend shadcn/ui components only when necessary
      - Document any custom component variations
      - Never duplicate shadcn/ui component functionality
      - Ensure all components support theming
      - DO NOT create new component files in /src/components/
      - DO NOT create custom UI components outside of /src/components/ui
      - Reuse and combine existing UI components to meet all requirements
      - If a component doesn't exist, use combinations of existing components
      - Any new page or feature components must only compose existing UI components
    </ui_component_library>

    <styling_guidelines>
      - Use Tailwind CSS exclusively for all styling
      - NO CSS-in-JS libraries (styled-components, emotion, etc.)
      - NO global CSS files except for base styles
      - Maintain consistent spacing and typography
      - Follow 8-point grid system for spacing
      - Use Tailwind responsive prefixes (sm:, md:, lg:, xl:, 2xl:)
      - Implement proper dark mode support with next-themes
      - Handle safe area and responsive layouts
      - Support dynamic text sizes and scaling
      - Use clsx and class-variance-authority for conditional styles
      - Organize Tailwind classes logically (layout, spacing, colors, effects)
      - Create reusable Tailwind class patterns
      - Use Tailwind CSS color palette consistently
      - Implement proper focus states for accessibility
      - Test styles across different screen sizes
    </styling_guidelines>

    <font_management>
      - Use @expo-google-fonts or Google Fonts CDN
      - NO local font files or custom font imports
      - Implement proper font loading with fallbacks
      - Handle loading states appropriately
      - Load fonts at the application root level
      - Provide fallback fonts in font-family declarations
      - Handle font scaling and responsive sizing
      - Test font rendering across browsers
      - Optimize font file sizes
    </font_management>

    <icons>
      Library: lucide-react (NOT lucide-react-native)
      Default Props:
        - size: 24
        - color: 'currentColor'
        - strokeWidth: 2
        - absoluteStrokeWidth: false
      Usage:
        - Import: import { IconName } from 'lucide-react'
        - Use only lucide-react for consistency
        - All lucide icons are supported
        - Customize size and color as needed
        - Use semantic icon names
    </icons>

    <image_handling>
      - Use Unsplash for stock photos exclusively
      - Direct URL linking only—NO downloading or storing images locally
      - Valid Unsplash URL format: https://images.unsplash.com/photo-{id}?w={width}&h={height}&fit=crop
      - ALL image URLs MUST be valid and accessible
      - NO local image files unless absolutely necessary
      - Implement proper image loading states
      - Handle image loading errors gracefully
      - Use appropriate image sizes and aspect ratios
      - Implement lazy loading for performance
      - Test all image URLs to ensure they load correctly
      - Optimize image dimensions for different screen sizes
      - Use responsive image techniques
      - Implement image caching strategies
    </image_handling>

    <error_handling>
      - Display errors inline in the UI (NOT as browser alerts)
      - NO Alert API usage—all errors display in components
      - Implement error states in all data-fetching components
      - Handle network errors gracefully with retry options
      - Provide user-friendly, actionable error messages
      - Implement retry mechanisms where appropriate
      - Log errors for debugging and monitoring
      - Handle edge cases and exception scenarios
      - Provide fallback UI for error states
      - Implement error boundaries for component crashes
      - Never expose sensitive information in error messages
      - Test error handling thoroughly
    </error_handling>

    <environment_variables>
      - Use Vite's env system (NOT Expo env system)
      - Prefix public variables with VITE_
      - Create .env.local for development
      - Create .env.production for production
      - Handle missing variables gracefully
      - Validate environment variables at startup
      - Use proper naming conventions (VITE_API_URL, etc.)
      - Type environment variables in TypeScript
      - Never commit sensitive variables
      - Document all required environment variables
    </environment_variables>

    <platform_compatibility>
      - Ensure responsive design across all screen sizes
      - Use Tailwind responsive prefixes for mobile-first design
      - Implement touch-friendly interactive elements
      - Test on desktop, tablet, and mobile browsers
      - Handle keyboard navigation properly
      - Implement proper focus management
      - Support both mouse and touch input
      - Test in Chrome, Firefox, Safari, and Edge
      - Handle different pixel densities and DPR
      - Ensure text readability on all devices
      - Test form inputs on mobile devices
      - Handle viewport and orientation changes
    </platform_compatibility>

    <state_management>
      - Use React Context for application-wide state (auth, theme, etc.)
      - Use useState for local component state
      - Use TanStack Query (React Query) for server state
      - Use useMutation for server mutations
      - NO Redux, Vuex, or other complex state libraries
      - Implement proper loading, success, and error states
      - Use useQuery for data fetching with caching
      - Implement custom hooks to encapsulate state logic
      - Handle offline scenarios appropriately
      - Implement proper data caching strategies
      - Use useCallback to optimize callbacks
      - Test state changes thoroughly
    </state_management>

    <api_integration>
      - Use fetch API or TanStack Query for API calls
      - Implement request interceptors and error handling
      - ALL API responses MUST have TypeScript type definitions
      - Use environment variables for API base URLs
      - Implement request timeouts and retry mechanisms
      - Handle request loading and error states properly
      - Implement data transformation and formatting
      - Handle sensitive data securely
      - Use proper HTTP methods and status codes
      - Implement proper request headers
      - Handle CORS issues appropriately
      - Test API integration thoroughly
      - Log API errors for debugging
    </api_integration>

    <form_handling>
      - Use React Hook Form for form state management
      - Use Zod for form validation
      - ALL form inputs MUST have validation rules
      - Display clear, inline error messages
      - Handle form loading and submission states
      - Implement form reset functionality
      - Support form default values
      - Wrap inputs with shadcn/ui form components
      - Implement field-level and form-level validation
      - Handle form submission errors gracefully
      - Provide user feedback during submission
      - Test form validation thoroughly
      - Implement proper form accessibility
    </form_handling>

    <notification_system>
      - Use sonner (toast) for all notifications
      - Import: import { toast } from "sonner"
      - Available methods:
        - toast.success("Success message")
        - toast.error("Error message")
        - toast.loading("Loading message")
        - toast.promise() for async operations
      - Never use browser Alert API
      - Provide appropriate feedback for all user actions
      - Implement toast notifications for form submissions
      - Use meaningful and actionable messages
      - Handle loading, success, and error states
      - Test notifications across different scenarios
    </notification_system>

    <animation_libraries>
      Preferred:
        - CSS transitions for simple animations
        - Tailwind CSS animation utilities
        - framer-motion for complex animations
        - react-spring for advanced interactions
      Avoid:
        - Over-animation that impacts performance
        - Animations without clear purpose
        - Animations that distract from content
      Best Practices:
        - Use animations to enhance UX, not distract
        - Keep animations performant and smooth
        - Respect prefers-reduced-motion setting
        - Test animations on low-end devices
    </animation_libraries>

    <performance_optimization>
      - Implement React.memo for expensive components
      - Use useCallback for callback function memoization
      - Use useMemo for expensive computations
      - Implement list virtualization for large datasets
      - Lazy load images with proper loading states
      - Code splitting and dynamic imports for routes
      - Monitor and optimize bundle size
      - Implement proper data caching with TanStack Query
      - Handle memory management and cleanup
      - Optimize re-renders with proper dependencies
      - Use Lighthouse for performance audits
      - Implement performance monitoring
      - Test performance on low-end devices
      - Optimize database queries on backend
    </performance_optimization>

    <accessibility>
      - Use semantic HTML elements (button, form, nav, etc.)
      - Provide alt text for all images
      - Implement keyboard navigation throughout app
      - Manage focus properly for modals and dialogs
      - Use ARIA labels and roles appropriately
      - Test with screen reader tools
      - Ensure sufficient color contrast (WCAG AA)
      - Support keyboard shortcuts where appropriate
      - Provide clear focus indicators
      - Test with accessibility checkers
      - Implement proper form labels
      - Handle skip navigation links
      - Test with assistive technologies
    </accessibility>

    <security_best_practices>
      - Implement proper authentication and authorization
      - Handle sensitive data securely
      - Validate ALL user input on client and server
      - Implement proper session management
      - Be cautious with localStorage and sessionStorage
      - Never store sensitive data in client storage
      - Implement CORS policies correctly
      - Store API keys in environment variables
      - Implement error handling without exposing internals
      - Use HTTPS for all connections
      - Sanitize user input to prevent XSS
      - Implement CSRF protection
      - Keep all dependencies updated and secure
      - Regular security audits
      - Never commit secrets to version control
    </security_best_practices>

    <testing>
      - Use Vitest for unit tests
      - Use React Testing Library for component tests
      - Test user interactions, not implementation details
      - Aim for at least 70% code coverage
      - Write tests for critical business logic
      - Use mocks to isolate external dependencies
      - Write readable and maintainable tests
      - Test error scenarios and edge cases
      - Test accessibility in components
      - Test responsive behavior
      - Implement integration tests for key flows
      - Use snapshot tests sparingly
    </testing>

    <code_organization>
      - Keep files small (single files should not exceed 300 lines)
      - Follow naming conventions:
        - PascalCase for components (Button, UserCard, etc.)
        - camelCase for utilities and hooks (useUser, formatDate, etc.)
        - UPPER_CASE for constants
      - Import third-party libraries first, then local modules
      - Use index.ts/tsx to export directory contents
      - Create clear folder structures by feature
      - Use @ alias for imports to simplify paths
      - Add meaningful comments and documentation
      - Refactor code regularly to eliminate duplication
      - Extract reusable logic into custom hooks
      - Create utility functions for common operations
      - Keep related files together
      - Organize components by responsibility
    </code_organization>

    <typescript_best_practices>
      - Enable strict TypeScript configuration
      - Explicitly define all types—avoid any
      - Use interface for data structures
      - Use type for union types and utility types
      - Annotate function parameters and return types
      - Implement generics for code reuse
      - Use const assertions for constant values
      - Export types for external use
      - Use discriminated unions for type safety
      - Implement proper null/undefined handling
      - Use optional chaining and nullish coalescing
      - Create reusable type utilities
      - Document complex type definitions
      - Test TypeScript types with strict mode
    </typescript_best_practices>

    <development_workflow>
      Available Scripts:
        - npm run dev              # Start dev server
        - npm run build            # Build for production
        - npm run build:dev        # Build in dev mode
        - npm run preview          # Preview production build
        - npm run lint             # Check code quality
      Environment Setup:
        - Create .env.local file
        - Define VITE_API_URL and other variables
        - Use sensible defaults for development
      Git Workflow:
        - Use clear, descriptive commit messages
        - Follow conventional commit format
        - Create feature branches for new work
        - Use pull requests for code review
        - Keep commits atomic and focused
      Code Quality:
        - Run lint before committing
        - Fix all ESLint warnings and errors
        - Use Prettier for code formatting
        - Regular code reviews
        - Keep dependencies updated
    </development_workflow>
  </critical_requirements>

  <best_practices>
    CRITICAL: ONLY USE COMPONENTS FROM /src/components/ui/ - NEVER CREATE NEW COMPONENTS
    - Prioritize user experience and code clarity
    - Write self-documenting code, minimize comments
    - Regular code reviews to maintain quality
    - Use meaningful variable and function names
    - Create reusable page and feature components that compose existing UI components
    - Keep components focused on single responsibility
    - Avoid deep component nesting and prop drilling
    - Implement graceful degradation and error recovery
    - Balance performance with maintainability
    - Keep dependencies up to date and secure
    - Document public APIs and complex logic
    - Test critical paths and edge cases
    - Monitor and log application behavior
    - Implement proper error boundaries
    - Use TypeScript strictly for type safety
    - Combine and extend existing UI components creatively
    - Use component composition to build complex interfaces
    - Follow the principle of composition over creation
  </best_practices>

  <common_patterns>
    <loading_state>
      const { data, isLoading, error } = useQuery({
        queryKey: ['data'],
        queryFn: fetchData,
      });

      if (isLoading) return <LoadingSpinner />;
      if (error) return <ErrorMessage error={error} />;
      return <DataDisplay data={data} />;
    </loading_state>

    <form_submission>
      const { mutate, isPending } = useMutation({
        mutationFn: submitForm,
        onSuccess: () => {
          toast.success('Form submitted successfully!');
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
    </form_submission>

    <protected_route>
      const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
        const { user, isLoading } = useAuth();

        if (isLoading) return <LoadingSpinner />;
        if (!user) return <Navigate to="/login" />;

        return children;
      };
    </protected_route>

    <custom_hook>
      export const useCustomLogic = (param: string) => {
        const [state, setState] = useState<StateType | null>(null);
        const [isLoading, setIsLoading] = useState(false);
        const [error, setError] = useState<Error | null>(null);

        useEffect(() => {
          const fetchData = async () => {
            try {
              setIsLoading(true);
              const result = await fetchFunction(param);
              setState(result);
            } catch (err) {
              setError(err as Error);
            } finally {
              setIsLoading(false);
            }
          };

          fetchData();
        }, [param]);

        return { state, isLoading, error };
      };
    </custom_hook>
  </common_patterns>

  <file_examples>
    Example React Component with proper TypeScript:
    ```tsx
    import { useState, useCallback } from 'react';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';

    interface UserInputProps {
      onSubmit: (name: string) => void;
      defaultValue?: string;
    }

    const UserInput: React.FC<UserInputProps> = ({ onSubmit, defaultValue = '' }) => {
      const [name, setName] = useState<string>(defaultValue);

      const handleSubmit = useCallback(() => {
        if (name.trim()) {
          onSubmit(name);
          setName('');
        }
      }, [name, onSubmit]);

      return (
        <div className="flex gap-2">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="flex-1"
          />
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      );
    };

    export default UserInput;
    ```

    Example API Integration:
    ```tsx
    import { useQuery } from '@tanstack/react-query';

    interface UserData {
      id: string;
      name: string;
      email: string;
    }

    const fetchUser = async (id: string): Promise<UserData> => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${id}`);
      if (!response.ok) throw new Error('Failed to fetch user');
      return response.json();
    };

    export const UserProfile = ({ userId }: { userId: string }) => {
      const { data: user, isLoading, error } = useQuery<UserData>({
        queryKey: ['user', userId],
        queryFn: () => fetchUser(userId),
      });

      if (isLoading) return <div>Loading...</div>;
      if (error) return <div>Error: {error.message}</div>;

      return (
        <div className="p-4 border rounded-lg">
          <h2 className="text-lg font-bold">{user?.name}</h2>
          <p className="text-gray-600">{user?.email}</p>
        </div>
      );
    };
    ```
  </file_examples>

</web_app_instructions>
Always use artifacts for file contents and commands, following the format shown in these examples.
```

## How to Use This Document

This XML-structured prompt document provides comprehensive guidance for web application development using this Vite + React + TypeScript template. It follows the same format as the mobile app instructions but is specifically tailored for web development.

**Key Features:**
- ✅ Clearly marked CRITICAL requirements
- ✅ Detailed project structure
- ✅ Comprehensive critical requirements sections
- ✅ Best practices and common patterns
- ✅ Real code examples
- ✅ Development workflow guidelines
- ✅ Version requirements

**Share with CodeAgent:**
When providing instructions to CodeAgent, reference this document to ensure all code modifications adhere to the established standards and best practices.
