// tsup.config.ts
import { defineConfig } from "tsup";
var tsup_config_default = defineConfig({
  entry: {
    index: "src/index.ts",
    "core/index": "src/core/index.ts",
    "button/index": "src/components/button/index.ts",
    "checkbox/index": "src/components/checkbox/index.ts",
    "accordion/index": "src/components/accordion/index.ts",
    "progress/index": "src/components/progress/index.ts",
    "indicator/index": "src/components/indicator/index.ts",
    "switch/index": "src/components/switch/index.ts",
    "select/index": "src/components/select/index.ts",
    "divider/index": "src/components/divider/index.ts",
    "avatar/index": "src/components/avatar/index.ts",
    "badge/index": "src/components/badge/index.ts",
    "alert/index": "src/components/alert/index.ts",
    "autocomplete/index": "src/components/autocomplete/index.ts",
    "datepicker/index": "src/components/datepicker/index.ts",
    "typography/index": "src/components/typography/index.ts",
    "view/index": "src/components/view/index.ts",
    "icon/index": "src/components/icon/index.ts"
  },
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  external: [
    "react",
    "react-native",
    "react-native-gesture-handler",
    "react-native-reanimated",
    "react-native-svg",
    "@xaui/core",
    "@xaui/core/theme"
  ],
  target: "es2020"
});
export {
  tsup_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidHN1cC5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9faW5qZWN0ZWRfZmlsZW5hbWVfXyA9IFwiL2hvbWUvcnlncmFtcy9Qcm9qZWN0cy94dWkvcGFja2FnZXMvbmF0aXZlL3RzdXAuY29uZmlnLnRzXCI7Y29uc3QgX19pbmplY3RlZF9kaXJuYW1lX18gPSBcIi9ob21lL3J5Z3JhbXMvUHJvamVjdHMveHVpL3BhY2thZ2VzL25hdGl2ZVwiO2NvbnN0IF9faW5qZWN0ZWRfaW1wb3J0X21ldGFfdXJsX18gPSBcImZpbGU6Ly8vaG9tZS9yeWdyYW1zL1Byb2plY3RzL3h1aS9wYWNrYWdlcy9uYXRpdmUvdHN1cC5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd0c3VwJ1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBlbnRyeToge1xuICAgIGluZGV4OiAnc3JjL2luZGV4LnRzJyxcbiAgICAnY29yZS9pbmRleCc6ICdzcmMvY29yZS9pbmRleC50cycsXG4gICAgJ2J1dHRvbi9pbmRleCc6ICdzcmMvY29tcG9uZW50cy9idXR0b24vaW5kZXgudHMnLFxuICAgICdjaGVja2JveC9pbmRleCc6ICdzcmMvY29tcG9uZW50cy9jaGVja2JveC9pbmRleC50cycsXG4gICAgJ2FjY29yZGlvbi9pbmRleCc6ICdzcmMvY29tcG9uZW50cy9hY2NvcmRpb24vaW5kZXgudHMnLFxuICAgICdwcm9ncmVzcy9pbmRleCc6ICdzcmMvY29tcG9uZW50cy9wcm9ncmVzcy9pbmRleC50cycsXG4gICAgJ2luZGljYXRvci9pbmRleCc6ICdzcmMvY29tcG9uZW50cy9pbmRpY2F0b3IvaW5kZXgudHMnLFxuICAgICdzd2l0Y2gvaW5kZXgnOiAnc3JjL2NvbXBvbmVudHMvc3dpdGNoL2luZGV4LnRzJyxcbiAgICAnc2VsZWN0L2luZGV4JzogJ3NyYy9jb21wb25lbnRzL3NlbGVjdC9pbmRleC50cycsXG4gICAgJ2RpdmlkZXIvaW5kZXgnOiAnc3JjL2NvbXBvbmVudHMvZGl2aWRlci9pbmRleC50cycsXG4gICAgJ2F2YXRhci9pbmRleCc6ICdzcmMvY29tcG9uZW50cy9hdmF0YXIvaW5kZXgudHMnLFxuICAgICdiYWRnZS9pbmRleCc6ICdzcmMvY29tcG9uZW50cy9iYWRnZS9pbmRleC50cycsXG4gICAgJ2FsZXJ0L2luZGV4JzogJ3NyYy9jb21wb25lbnRzL2FsZXJ0L2luZGV4LnRzJyxcbiAgICAnYXV0b2NvbXBsZXRlL2luZGV4JzogJ3NyYy9jb21wb25lbnRzL2F1dG9jb21wbGV0ZS9pbmRleC50cycsXG4gICAgJ2RhdGVwaWNrZXIvaW5kZXgnOiAnc3JjL2NvbXBvbmVudHMvZGF0ZXBpY2tlci9pbmRleC50cycsXG4gICAgJ3R5cG9ncmFwaHkvaW5kZXgnOiAnc3JjL2NvbXBvbmVudHMvdHlwb2dyYXBoeS9pbmRleC50cycsXG4gICAgJ3ZpZXcvaW5kZXgnOiAnc3JjL2NvbXBvbmVudHMvdmlldy9pbmRleC50cycsXG4gICAgJ2ljb24vaW5kZXgnOiAnc3JjL2NvbXBvbmVudHMvaWNvbi9pbmRleC50cycsXG4gIH0sXG4gIGZvcm1hdDogWydjanMnLCAnZXNtJ10sXG4gIGR0czogdHJ1ZSxcbiAgY2xlYW46IHRydWUsXG4gIGV4dGVybmFsOiBbXG4gICAgJ3JlYWN0JyxcbiAgICAncmVhY3QtbmF0aXZlJyxcbiAgICAncmVhY3QtbmF0aXZlLWdlc3R1cmUtaGFuZGxlcicsXG4gICAgJ3JlYWN0LW5hdGl2ZS1yZWFuaW1hdGVkJyxcbiAgICAncmVhY3QtbmF0aXZlLXN2ZycsXG4gICAgJ0B4YXVpL2NvcmUnLFxuICAgICdAeGF1aS9jb3JlL3RoZW1lJyxcbiAgXSxcbiAgdGFyZ2V0OiAnZXMyMDIwJyxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTRRLFNBQVMsb0JBQW9CO0FBRXpTLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLE9BQU87QUFBQSxJQUNMLE9BQU87QUFBQSxJQUNQLGNBQWM7QUFBQSxJQUNkLGdCQUFnQjtBQUFBLElBQ2hCLGtCQUFrQjtBQUFBLElBQ2xCLG1CQUFtQjtBQUFBLElBQ25CLGtCQUFrQjtBQUFBLElBQ2xCLG1CQUFtQjtBQUFBLElBQ25CLGdCQUFnQjtBQUFBLElBQ2hCLGdCQUFnQjtBQUFBLElBQ2hCLGlCQUFpQjtBQUFBLElBQ2pCLGdCQUFnQjtBQUFBLElBQ2hCLGVBQWU7QUFBQSxJQUNmLGVBQWU7QUFBQSxJQUNmLHNCQUFzQjtBQUFBLElBQ3RCLG9CQUFvQjtBQUFBLElBQ3BCLG9CQUFvQjtBQUFBLElBQ3BCLGNBQWM7QUFBQSxJQUNkLGNBQWM7QUFBQSxFQUNoQjtBQUFBLEVBQ0EsUUFBUSxDQUFDLE9BQU8sS0FBSztBQUFBLEVBQ3JCLEtBQUs7QUFBQSxFQUNMLE9BQU87QUFBQSxFQUNQLFVBQVU7QUFBQSxJQUNSO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUNWLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
