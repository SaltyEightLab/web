module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
        '^@/(.*)$': '<rootDir>/$1', // Added: Resolve aliases
    },
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
        '^.+\\.(js|jsx)$': ['babel-jest', { presets: ['next/babel'] }],
    },
    globals: {
        'ts-jest': {
            tsconfig: {
                jsx: 'react-jsx',
            },
        },
    },
};